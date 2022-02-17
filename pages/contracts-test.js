import {Button, Container} from "react-bootstrap";
import * as nearAPI from "near-api-js";
import {getObjects} from "../utils/near";
import {gameContractName} from "../constants";

export default function ContractsTest() {
    let contract, wallet;

    const GAS_MAKE_AVAILABLE = 50000000000000;

    const handleMakeAvailable = () => {
        contract.make_available({config: {},}, GAS_MAKE_AVAILABLE, nearAPI.utils.format.parseNearAmount('2')).then(r => {
            console.log(r);
        }).catch(e => {
            console.error(e);
        });
    }

    const handleGetAvailablePlayers = () => {
        contract.get_available_players({from_index: 0, limit: 50}).then(r => {
            console.log(r);
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

    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;

        contract = new nearAPI.Contract(
            _wallet.account(),
            gameContractName,
            {
                viewMethods: ['get_available_players', 'get_available_games', 'is_already_in_the_waiting_list'],
                changeMethods: ['make_available', 'start_game', 'generate_event', 'make_unavailable'],
            }
        );
    });
    return <Container>
        <Button onClick={handleMakeAvailable}>make available</Button>
        <Button onClick={handleGetAvailablePlayers}>get available players</Button>
        <Button onClick={handleMakeUnavailable}>make unavailable</Button>
        <Button onClick={handleIsInList}>is in list</Button>
    </Container>
}