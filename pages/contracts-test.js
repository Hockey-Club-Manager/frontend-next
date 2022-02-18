import {Button, Container, Row, Col, Form, Table} from "react-bootstrap";
import * as nearAPI from "near-api-js";
import {getObjects} from "../utils/near";
import {gameContractName} from "../constants";
import {useState} from "react";
import {nanoid} from "nanoid";
import {formatNearAmount} from "../utils/near";

export default function ContractsTest() {
    let contract, wallet;

    const GAS_MAKE_AVAILABLE = 50000000000000;

    const [isInList, setIsInList] = useState(false);
    const [bid, setBid] = useState(0.02);
    const [availablePlayers, setAvailablePlayers] = useState();

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
    const handleIsInList = () => {
        contract.is_already_in_the_waiting_list({account_id: wallet.account().accountId}).then(r => {
            console.log(r);
        }).catch(e => console.error(e) )
    }
    const handleStartGame = () => {
        contract.start_game({opponent_id: 'kastet99.testnet'}, GAS_MAKE_AVAILABLE, nearAPI.utils.format.parseNearAmount(bid.toString())).then(r => {
            console.log(r);
        }).catch(e => console.error(e) )
    }

    const handleGetGameConfig = () => {
        contract.get_game_config({account_id: wallet.account().accountId}).then(r => {
            console.log(r, `deposit: ${formatNearAmount(r.deposit)}`);
        }).catch(e => console.error(e));
    }

    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;

        contract = new nearAPI.Contract(
            _wallet.account(),
            gameContractName,
            {
                viewMethods: ['get_available_players', 'get_available_games', 'is_already_in_the_waiting_list', 'get_game_config'],
                changeMethods: ['make_available', 'start_game', 'generate_event', 'make_unavailable'],
            }
        );

        contract.is_already_in_the_waiting_list({account_id: wallet.account().accountId}).then(r => {
            setIsInList(r);
        }).catch(e => console.error(e) )
    });
    return <Container>
        <h1>{isInList ? 'You are in list' : 'You are not in list'}</h1>
        {/*{!isInList ?*/}
            <Row>
                <Col>
                    <input type='number' step='0.01' value={bid} onChange={event => setBid(parseFloat(event.target.value))}/>
                </Col>
                <Col>
                    <Button onClick={handleMakeAvailable}>make available</Button>
                </Col>
            </Row>
        {/*:*/}
        {/*    // TODO set bid that is set in contract, not in current input field*/}
            <Button onClick={handleMakeUnavailable}>make unavailable</Button>
        {/*}*/}
        <Row>
            <Col>
                <Button onClick={handleGetAvailablePlayers}>get available players</Button>
            </Col>
        </Row>
        { availablePlayers &&
            <Row>
                <Col>
                    <Table striped bordered hover variant='warning'>
                        <thead>
                        <tr>
                            <th>username</th>
                            <th>bid</th>
                            <th>opponent</th>
                        </tr>
                        </thead>
                        <tbody>
                        {availablePlayers.map(player => <tr key={nanoid()}>
                            <td>{player[0]}</td>
                            <td>{formatNearAmount(player[1].deposit)} Ⓝ</td>
                            <td>{player[1].opponent_id}</td>
                        </tr>)
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        }
        <Button onClick={handleIsInList}>is in list</Button>
        <Button onClick={handleGetGameConfig}>Get game config</Button>
        <hr />
        <Button onClick={handleStartGame}>Start game</Button>
    </Container>
}