import * as nearAPI from "near-api-js";

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

const NEAR_NOMINATION = 1_000_000_000_000_000_000_000_000;

// Converts yoctoNEAR to human-readable amount
export const formatNearAmount = balance => balance / NEAR_NOMINATION;
