import {parseNearAmount} from "near-api-js/lib/utils/format";
import {getNftContract, getObjects} from "../utils/near";


export const handleMint = async (royalties, media, validMedia, title, player) => {
    if (!media.length || !validMedia) {
        alert('Please enter a valid Image Link. You should see a preview below!');
        return;
    }

    // shape royalties data for minting and check max is < 20%
    let perpetual_royalties = Object.entries(royalties).map(([receiver, royalty]) => ({
        [receiver]: royalty * 100
    })).reduce((acc, cur) => Object.assign(acc, cur), {});
    if (Object.values(perpetual_royalties).reduce((a, c) => a + c, 0) > 2000) {
        return alert('Cannot add more than 20% in perpetual NFT royalties when minting');
    }

    const metadata = {
        title,
        media,
        issued_at: Date.now(),
        extra: JSON.stringify(player),
    };

    const deposit = parseNearAmount('0.1');

    let GAS = "200000000000000";

    let contract, wallet;
    await getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;
        contract = getNftContract(_wallet);
    });

    console.log(contract);

    await contract.nft_mint({
        token_id: 'token-' + Date.now(),
        metadata,
        perpetual_royalties
    }, GAS, deposit);
};