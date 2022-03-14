import {Button, ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {PlayingCard} from "../components/styled-components";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {getGameContract, getObjects} from "../utils/near";
import {nanoid} from "nanoid";
import {
    Event,
    FieldPlayer,
    nonMessageActions,
    PlayerSide,
    UserID,
    Five,
    PlayerPosition,
    getOpponentPosition
} from "../utils/nft-hockey-api";

const Field = styled.div`
  background-color: #ffffff;
  background-image: url("/field-background.png");
  border-radius: 30px;
  background-size: auto 500px;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  overflow-y: auto;
`

const LogoSquare = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  border: 3px solid white;

  &.u-1 {
    background-color: #5161ee;
  }

  &.u-2 {
    background-color: #ef615f;
  }
`

const SelectDropdownBtn = styled(Button)`
  width: 300px;
`

const BenchRow = styled(Row)`
  margin-top: 80px;
`

const Timer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: dodgerblue;
  padding: 5px 20px;
  font-size: 30px;
  border-radius: 0 0 0 15px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
`

const MessageDiv = styled.div`
  background-color: #ededed;
  width: 200px;
  
  &.left {
    border: 2px solid #5161ee;
    border-radius: 20px 20px 20px 0;
    margin-left: 20px;
    & h5 {
      color: #5161ee;
    }
  }
  &.right {
    border: 2px solid #ef615f;
    border-radius: 20px 20px 0 20px;
    margin-right: 20px;
    & h5 {
      color: #ef615f;
    }
  }
`

function Message({playerWithThePuck, action, opponent, username, side}) {
    return <div className={`d-flex justify-content-${side === 'left' ? 'start' : 'end'} my-2`}>
        <MessageDiv className={side}>
            <Row className='justify-content-start'>
                <Col className="col-auto ms-3">
                    <div className="username">{username}</div>
                </Col>
            </Row>
            <h5>{playerWithThePuck} {action} {opponent}</h5>
        </MessageDiv>
    </div>
}

export default function Game() {
    let contract, wallet;

    const router = useRouter();
    const [eventsQueue, setEventsQueue] = useState([]);
    const [autoGenerate, setAutoGenerate] = useState(false);
    const [eventsIntervalID, setEventsIntervalID] = useState(null);
    const [myGameID, setMyGameID] = useState(null);
    const [players, setPlayers] = useState(null);
    const [myPlayerNumber, setMyPlayerNumber] = useState<UserID>(null);
    const [autoReload, setAutoReload] = useState(false);
    const [tableIntervalID, setTableIntervalID] = useState(null);
    const [event, setEvent] = useState<Event>(null);
    const [eventMessagesBuffer, setEventMessagesBuffer] = useState([]);

    function getOpponent(event: Event): FieldPlayer {
        if(event.playerWithPuck.userID === myPlayerNumber) {
            return event.opponentTeam.five.getPlayerByPosition(getOpponentPosition(event.playerWithPuck.position));
        } else {
            return event.myTeam.five.getPlayerByPosition(getOpponentPosition(event.playerWithPuck.position));
        }
    }

    const GAS_MOVE = 50_000_000_000_000;
    useEffect(()=>{
        if (!event || nonMessageActions.includes(event.action)) return;
        const side: PlayerSide = event.playerWithPuck.userID === 1 ? 'left' : 'right';

        let username;
        if (event.playerWithPuck.userID === myPlayerNumber) {
            username = players[myPlayerNumber - 1];
        } else {
            if (myPlayerNumber === 1) {
                username = players[1];
            } else {
                username = players[0];
            }
        }
        const eventMessage = {
            playerWithPuck: event.playerWithPuck.number,
            action: event.action,
            opponent: getOpponent(event).number,
            side: side,
            username: username,
        };
        if (eventMessagesBuffer.length === 7) {
            setEventMessagesBuffer(b => [...b.slice(1), eventMessage]);
        // } else if (eventMessagesBuffer < 7) {
        //     setEventMessagesBuffer(b => [...b, event])
        // } else alert('messages buffer > 7');
        } else setEventMessagesBuffer(b => [...b, eventMessage])

    }, [event]);

    const localReceivedEventsKey = 'receivedEvents';
    function getLocalReceivedEvents() {
        return parseInt(localStorage.getItem(localReceivedEventsKey)) || 0;
    }
    function setLocalReceivedEvents(value) {
        localStorage.setItem(localReceivedEventsKey, value);
    }
    function incrementLocalReceivedEvents(incrementBy) {
        localStorage.setItem(localReceivedEventsKey, getLocalReceivedEvents() + incrementBy);
    }
    function endGame() {
        setLocalReceivedEvents(0);
        clearInterval(eventsIntervalID);
        setMyGameID(null);
        setPlayers(null);
        setMyPlayerNumber(null);
        console.log('Game ended');
    }

    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;
        contract = getGameContract(_wallet);
    });

    const shouldUpdate = useRef(true);
    const handleGenerateEvent = () => {
        if (shouldUpdate.current) {
            shouldUpdate.current = false;
            if (typeof myGameID === "number") {
                contract.generate_event({number_of_rendered_events: 0, game_id: myGameID }, GAS_MOVE)
                    .then(e =>  {
                        console.log('generate event: ', e)
                        shouldUpdate.current = true;
                        if (!e.length) {
                            contract.get_available_games({from_index: 0, limit: 50}).then(r => {
                                const _myGameID = r.filter(game => game[1][0] === wallet.account().accountId ||
                                    game[1][1] === wallet.account().accountId)[0][0];
                                if (!_myGameID) endGame();
                            })
                                .catch(e => console.error('get available games: ', e));
                        } else {
                            if(e[e.length - 1]?.action === 'GameFinished') {
                                endGame();
                            } else {
                                const eventObjects = e.map(_e => Event.fromJSON(_e));
                                setEventsQueue(q => [...q, ...eventObjects]);
                                incrementLocalReceivedEvents(e.length);
                            }
                        }
                    })
                    .catch(e => console.error('generate event: ', e));
            } else {
                contract.get_available_games({from_index: 0, limit: 50}).then(r => {
                    const accountId = wallet.account().accountId;
                    const myGame = r.filter(game => game[1][0] === accountId || game[1][1] === accountId)[0];
                    const _myGameID = myGame[0];
                    setMyGameID(_myGameID);
                    setPlayers(myGame[1]);
                    setMyPlayerNumber(myGame[1].indexOf(accountId) + 1);

                    contract.generate_event({number_of_rendered_events: 0, game_id: _myGameID }, GAS_MOVE)
                        .then(e => {
                            console.log('generate event: ', e)
                            shouldUpdate.current = true;
                            incrementLocalReceivedEvents(e.length);
                            if(e[e.length - 1]?.action === 'GameFinished') {
                                endGame();
                            } else {
                                const eventObjects = e.map(_e => Event.fromJSON(_e));
                                setEventsQueue(eventObjects);
                            }
                        })
                        .catch(e => console.error('generate event: ', e));
                }).catch(e => console.error('get available games: ', e));
            }
        }
    }

    const switchAutoGenerate = () => {
        if (!autoGenerate) {
            setEventsIntervalID(setInterval(()=>{
                handleGenerateEvent();
            }, 1000))
        } else {
            clearInterval(eventsIntervalID);
        }
        setAutoGenerate(a => !a);
    }
    function switchAutoReload() {
        if (!autoReload) {
            setTableIntervalID(setInterval(()=>{
                setEventsQueue(q => {
                    console.log('items to render: ', q);
                    setEvent(q[0] || null);
                    return q.slice(1);
                });
            }, 1000));
        } else {
            clearInterval(tableIntervalID);
        }
        setAutoReload(a => !a);
    }
    return <Container>
        <Row className='mt-4'>
            <Col className='text-center' xs={5}>
                <h1>Period 2</h1>
                <Field>
                    {eventMessagesBuffer?.map(e => <Message
                        key={nanoid()}
                        playerWithThePuck={e.playerWithPuck}
                        action={e.action}
                        opponent={e.opponent}
                        side={e.side}
                        username={e.username}
                    />
                    )}
                </Field>
                <Row className='mt-4 justify-content-between'>
                    <Col className='col-auto'>
                        <Button onClick={switchAutoGenerate}>Take TO</Button>
                    </Col>
                    <Col className='col-auto'>
                        <Button onClick={switchAutoReload}>Empty net</Button>
                    </Col>
                    <Col className='col-auto'>
                        <Button>Take speech</Button>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col xs={8}>
                        <Row className='justify-content-start'>
                            <Col className='col-auto'>
                                <LogoSquare className='u-1' />
                            </Col>
                            <Col className='col-auto'>
                                <h1>2 - 0</h1>
                            </Col>
                            <Col className='col-auto'>
                                <LogoSquare className='u-2' />
                            </Col>
                        </Row>
                        <Row className='mt-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                        </Row>
                        <Row className='mt-3 mb-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-left' />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-right' />
                            </Col>
                        </Row>
                        <Dropdown as={ButtonGroup} className='mt-5 mb-3'>
                            <SelectDropdownBtn variant='outline-primary'>Tactics</SelectDropdownBtn>
                            <Dropdown.Toggle variant='outline-primary' />
                            <Dropdown.Menu>
                                <Dropdown.Item>Not </Dropdown.Item>
                                <Dropdown.Item>yet</Dropdown.Item>
                                <Dropdown.Item>implemented</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <PlayingCard className='goalie-game' />
                        <BenchRow className='justify-content-center'>
                            <Col xs={1} className='m-0'>
                                <PlayingCard className='sm bench'>
                                    <img src='/card-back-yellow.png' />
                                </PlayingCard>
                            </Col>
                            <Col className='m-0'>
                                <PlayingCard className='sm bench'>
                                    <img src='/card-back-blue.png' />
                                </PlayingCard>
                            </Col>
                        </BenchRow>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Timer>2:32</Timer>
    </Container>
}
