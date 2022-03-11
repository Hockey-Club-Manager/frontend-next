import * as nearAPI from "near-api-js";

export const gameContractName = "uriyyuriy.testnet";
export const marketContractName = "market_hock.testnet";
export const nftContractName = "nft_hock.testnet";

export async function getConfig() {
    return {
        networkId: "testnet",
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
}

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

export function getMarketContract(wallet) {
    return new nearAPI.Contract(
        wallet.account(),
        marketContractName,
        {
            viewMethods: [],
            changeMethods: [],
        }
    );
}

export function getNftContract(wallet) {
    return new nearAPI.Contract(
        wallet.account(),
        nftContractName,
        {
            viewMethods: [],
            changeMethods: ["nft_mint"],
        }
    );
}


const NEAR_NOMINATION = 1_000_000_000_000_000_000_000_000;

// Converts yoctoNEAR to human-readable amount
export const formatNearAmount = balance => balance / NEAR_NOMINATION;
