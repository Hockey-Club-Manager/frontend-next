import {Button, Container, Row, Col, Table} from "react-bootstrap";
import * as nearAPI from "near-api-js";
import {getObjects, getGameContract} from "../utils/near";
import {useState} from "react";
import {nanoid} from "nanoid";
import {formatNearAmount} from "../utils/near";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export default function ContractsTest() {
    let contract, wallet;

    const GAS_MAKE_AVAILABLE = 50_000_000_000_000;
    const GAS_MOVE = 30_000_000_000_000;

    const [isInList, setIsInList] = useState(false);
    const [bid, setBid] = useState(0.02);
    const [availablePlayers, setAvailablePlayers] = useState();
    const [availableGames, setAvailableGames] = useState();
    const [selectedOpponentID, setSelectedOpponentID] = useState('');

    const handleMakeAvailable = () => {
        contract.make_available({config: {},}, GAS_MAKE_AVAILABLE, nearAPI.utils.format.parseNearAmount(bid.toString())).then(r => {
            console.log(r);
        }).catch(e => {
            console.error(e);
        });
    }
    const handleGetAvailablePlayers = () => {
        contract.get_available_players({from_index: 0, limit: 50}).then(r => {
            console.log(r);
            setAvailablePlayers(r);
        });
    }
    const handleMakeUnavailable = () => {
        contract.make_unavailable().then(r => {
            console.log(r);
        })
    }

    function updateInTheWaitingList() {
        contract.is_already_in_the_waiting_list({account_id: wallet.account().accountId}).then(r => {
            setIsInList(r);
            console.log('is already in the waiting list: ' + r);
        }).catch(e => console.error(e) )
    }

    const handleStartGame = () => {
        console.log(selectedOpponentID);
        if (selectedOpponentID) {
            contract.start_game({opponent_id: selectedOpponentID}, GAS_MAKE_AVAILABLE, nearAPI.utils.format.parseNearAmount(bid.toString())).then(r => {
                // unused code due to redirect
                console.log(r);
            }).catch(e => console.error(e) )
        } else {
            alert('Select opponent');
        }
    }

    const getAvailableGames = () => {
        contract.get_available_games({from_index: 0, limit: 50}).then(r => {
            setAvailableGames(r);
            console.log(r);
        }).catch(e => console.error(e));
    }

    const stopGame = gameID => {
        console.log(gameID)
        contract.internal_stop_game({game_id: gameID}).then(r => {
            console.log(r);
        }).catch(e => console.error(e));
    }

    const handleGetGameConfig = () => {
        contract.get_game_config({account_id: wallet.account().accountId}).then(r => {
            console.log(r, `deposit: ${formatNearAmount(r.deposit)}`);
        }).catch(e => console.error(e));
    }

    const handleGenerateEvent = () => {
        contract.get_available_games({from_index: 0, limit: 50}).then(r => {
            const myGameID = r.filter(game => game[1][0] === wallet.account().accountId || game[1][1] === wallet.account().accountId)[0][0];

            contract.generate_event({number_of_rendered_events: 0, game_id: myGameID }, GAS_MOVE)
                .then(e => console.log('generate event: ', e))
                .catch(e => console.error('generate event: ', e));
        }).catch(e => console.error(e));
    }

    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;
        contract = getGameContract(_wallet);
    });

    return <Container>
        <h1>{isInList ? 'You are in list' : 'You are not in list'}</h1>
            <Row>
                <Col>
                    <input type='number' step='0.01' value={bid} onChange={event => setBid(parseFloat(event.target.value))}/>
                </Col>
                <Col>
                    <Button onClick={handleMakeAvailable}>make available</Button>
                </Col>
            </Row>
            <Button onClick={handleMakeUnavailable}>make unavailable</Button>
        <Row>
            <Col>
                <Button onClick={handleGetAvailablePlayers}>get available players</Button>
            </Col>
        </Row>
        { availablePlayers &&
            <Table striped bordered hover variant='warning'>
                <thead>
                <tr>
                    <th><code>select</code></th>
                    <th>username</th>
                    <th>bid</th>
                </tr>
                </thead>
                <tbody>
                {availablePlayers.map(player => <tr key={nanoid()}>
                    <td onClick={() => {
                        setBid(formatNearAmount(player[1].deposit));
                        setSelectedOpponentID(player[0]);
                    }}>
                        <FontAwesomeIcon icon={player[0] === selectedOpponentID ? faCheckCircle : faCircle} />
                    </td>
                    <td>{player[0]}</td>
                    <td>{formatNearAmount(player[1].deposit)} Ⓝ</td>
                </tr>)
                }
                </tbody>
            </Table>
        }
        <Button onClick={updateInTheWaitingList}>is in list</Button>
        <Button onClick={handleGetGameConfig}>Get game config</Button>
        <hr/>
        <Row className='justify-content-start'>
            <Col className='col-auto'>
                <h2>Available games</h2>
            </Col>
            <Col className='col-auto'>
                <Button onClick={getAvailableGames}>Update</Button>
            </Col>
        </Row>
        <Table striped bordered hover variant='warning'>
            <thead>
            <tr>
                <th><code>stop</code></th>
                <th>Game id</th>
                <th>Player 1</th>
                <th>Player 2</th>
            </tr>
            {availableGames?.map(game => <tr key={`game-${game[0]}`}>
                <td onClick={()=>stopGame(game[0])}>stop</td>
                <td>{game[0]}</td>
                <td>{game[1][0]}</td>
                <td>{game[1][1]}</td>
            </tr>)}
            </thead>
        </Table>
        <hr />
        <Button onClick={handleStartGame} variant='success'>Start game</Button>
        <Button onClick={handleGenerateEvent}>Generate event</Button>
    </Container>
}