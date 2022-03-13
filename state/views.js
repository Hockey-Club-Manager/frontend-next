import {
    getMarketContract,
    getNftContract,
    getObjects,
    marketContractName,
    nftContractName
} from "../utils/near";

const BAD_OWNER_ID = [];
// api-helper config
const domain = 'https://helper.nearapi.org';
const batchPath = domain + '/v1/batch/';
const headers = new Headers({
    'max-age': '300'
});

export const getMarketStoragePaid = () => async ({ update }) => {
    let marketContract, marketWallet;

    getObjects().then(r => {
        const {wallet: _wallet} = r;
        marketWallet = _wallet;
        marketContract = getMarketContract(_wallet);
    });

    update('views', {
        marketStoragePaid: await marketContract.storage_paid({ account_id: marketWallet.account() })
    })
}

export const loadUserTokens = () => async () => {
    let nftContract, nftWallet;

    await getObjects().then(r => {
        const {wallet: _wallet} = r;
        nftWallet = _wallet;
        nftContract = getNftContract(_wallet);
    });

    let marketContract, marketWallet;

    await getObjects().then(r => {
        const {wallet: _wallet} = r;
        marketWallet = _wallet;
        marketContract = getMarketContract(_wallet);
    });

    /// user tokens
    let tokens = []

    let nftAccount = nftWallet.account();
    let marketAccount = marketWallet.account();

    if (nftAccount && marketAccount) {
        tokens = await nftContract.nft_tokens_for_owner({
            account_id: nftAccount.accountId,
            from_index: '0',
            limit: 50
        });
        const sales = await marketContract.get_sales_by_owner_id({
            account_id: marketAccount.accountId,
            from_index: '0',
            limit: 50
        });
        // merge tokens with sale data if it's on sale
        for (let i = 0; i < tokens.length; i++) {
            const { token_id } = tokens[i];
            let sale = sales.find(({ token_id: t }) => t === token_id);
            // don't have it in state, go find sale data
            if (!sale) {
                sale = await marketContract.get_sale({ nft_contract_token: marketContractName + ":" + token_id }).catch(() => { });
            }
            tokens[i] = Object.assign(tokens[i], sale || {});
        }
    }

    return {tokens}
}

export const loadAllTokens = async () => {
    let nftContract, nftWallet;

    await getObjects().then(r => {
        const {wallet: _wallet} = r;
        nftWallet = _wallet;
        nftContract = getNftContract(_wallet);
    });

    // all tokens
    // need to use NFT helper for deployed
    let allTokens = [];

    allTokens = await nftContract.nft_tokens({
        from_index: '50',
        limit: 100
    });

    allTokens = allTokens.filter(({ owner_id }) => !BAD_OWNER_ID.includes(owner_id));

    return allTokens
}

export const loadSales = async () => {
    let nftContract, nftWallet;

    await getObjects().then(r => {
        const {wallet: _wallet} = r;
        nftWallet = _wallet;
        nftContract = getNftContract(_wallet);
    });

    let marketContract, marketWallet;

     await getObjects().then(r => {
        const {wallet: _wallet} = r;
        marketWallet = _wallet;
        marketContract = getMarketContract(_wallet);
    });

    /// all sales
    // need to use NFT helper for deployed contract
    let sales = [];
    sales = await marketContract.get_sales_by_nft_contract_id({
        nft_contract_id: nftContractName,
        from_index: '0',
        limit: 50
    });

    const saleTokens = await nftContract.nft_tokens_batch({
        token_ids: sales.filter(({ nft_contract_id }) => nft_contract_id === nftContractName).map(({ token_id }) => token_id)
    });
    // merge sale listing with nft token data
    for (let i = 0; i < sales.length; i++) {
        const { token_id } = sales[i];
        let token = saleTokens.find(({ token_id: t }) => t === token_id);
        // don't have it in batch, go find token data
        if (!token) {
            token = await nftContract.nft_token({ token_id });
        }
        sales[i] = Object.assign(sales[i], token);
    }
    sales = sales.filter(({ owner_id }) => !BAD_OWNER_ID.includes(owner_id));

    return sales
};
