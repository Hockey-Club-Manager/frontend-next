import * as nearAPI from "near-api-js";

export const gameContractName = "dev-1645288206086-91527018499770";

export async function getObjects() {
    const config = {
        networkId: "testnet",
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };

    const near = await nearAPI.connect(config);
    const wallet = new nearAPI.WalletConnection(near);

    return {near, wallet};
}

export function getGameContract(wallet) {
    return new nearAPI.Contract(
        wallet.account(),
        gameContractName,
        {
            viewMethods: ['get_available_players', 'get_available_games', 'is_already_in_the_waiting_list', 'get_game_config',],
            changeMethods: ['make_available', 'start_game', 'generate_event', 'make_unavailable', 'internal_stop_game'],
        }
    );
}

const NEAR_NOMINATION = 1_000_000_000_000_000_000_000_000;

// Converts yoctoNEAR to human-readable amount
export const formatNearAmount = balance => balance / NEAR_NOMINATION;
