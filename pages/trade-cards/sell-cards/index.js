import {Row, Col} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
import React, {useEffect, useState} from "react";
import {getMarketStoragePaid, loadUserTokens} from "../../../state/views";
import {formatNearAmount, getObjects, getTokenOptions, token2symbol} from "../../../utils/near";
import {parseNearAmount} from "near-api-js/lib/utils/format";
import {handleAcceptOffer, handleRegisterStorage, handleSaleUpdate} from "../../../state/actions";
import styled from "styled-components";

const CardCol = styled(Col)`
  width: 300px;
`

function NFTCardCol({imgURL, year, position, name, number, role, stats, detailsLink, cost}) {
    return <CardCol className='col-4 mx-3'>
        <NFTCard
            imgURL={imgURL}
            year={year}
            position={position}
            name={name}
            number={number}
            role={role}
            stats={stats}
            detailsLink={detailsLink}
        />
        <Row className='justify-content-end mt-2'>
            <Col className='col-auto'>
                <h4>COST {cost} Ⓝ</h4>
            </Col>
        </Row>
    </CardCol>
}

export default function SellCards() {
    const [tokens, setTokens] = useState([]);
    const [marketStoragePaid, setMarketStoragePaid] = useState();
    const [accountID, setAccountID] = useState();

    /// updating user tokens
    const [price, setPrice] = useState('');
    const [ft, setFT] = useState('near');
    const [saleConditions, setSaleConditions] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);


    function loadCards () {
        getMarketStoragePaid().then(r => {
            setMarketStoragePaid(r);
        })

        loadUserTokens().then(r => {
            setTokens(r);
            console.log(tokens)
        })

        let wallet;
        getObjects().then(r => {
            const {wallet: _wallet} = r;
            wallet = _wallet;
            setAccountID(_wallet.accountId)
        });

        setIsLoaded(true);
    }

    useEffect(() => {
        loadCards();
    }, []);

    return <TradeCardsLayout>
            { isLoaded ?
                !tokens ? <p>No NFTs.</p> :
                tokens.length && tokens.map(({
                                                 metadata: {media, title, extra},
                                                 owner_id,
                                                 token_id,
                                                 sale_conditions = {},
                                                 bids = {},
                                                 royalty = {}
                                             }) => <div key={token_id} className="item">
                    <Row className='mx-4 my-4 gx-4 gy-4'>
                        <NFTCardCol
                            imgURL={media}
                            year={2022}
                            position={extra && JSON.parse(extra).position}
                            name={title}
                            number={extra && JSON.parse(extra).number}
                            role={extra && JSON.parse(extra).role}
                            stats={extra && JSON.parse(JSON.parse(extra).stats)}
                            detailsLink="/trade-cards/buy-cards/1"
                            cost={3}
                        />
                    </Row>
                    {
                        marketStoragePaid !== '0' ? <>
                                <h4>Royalties</h4>
                                {
                                    Object.keys(royalty).length > 0 ?
                                        Object.entries(royalty).map(([receiver, amount]) => <div key={receiver}>
                                            {receiver} - {amount / 100}%
                                        </div>)
                                        :
                                        <p>This token has no royalties.</p>
                                }
                                {
                                    Object.keys(sale_conditions).length > 0 && <>
                                        <h4>Current Sale Conditions</h4>
                                        {
                                            Object.entries(sale_conditions).map(([ft_token_id, price]) => <div
                                                className="margin-bottom" key={ft_token_id}>
                                                {price === '0' ? 'open' : formatNearAmount(price, 4)} - {token2symbol[ft_token_id]}
                                            </div>)
                                        }
                                    </>
                                }
                                {
                                    accountID === owner_id && <>
                                        <div>
                                            <h4>Add Sale Conditions</h4>
                                            <input type="number" placeholder="Price" value={price}
                                                   onChange={(e) => setPrice(e.target.value)}/>
                                            {
                                                getTokenOptions(ft, setFT)
                                            }
                                            <button onClick={() => {
                                                if (!price.length) {
                                                    return alert('Enter a price');
                                                }
                                                const newSaleConditions = {
                                                    ...saleConditions,
                                                    [ft]: parseNearAmount(price)
                                                }
                                                setSaleConditions(newSaleConditions);
                                                setPrice('');
                                                setFT('near');
                                                handleSaleUpdate(token_id, newSaleConditions);
                                            }}>Add
                                            </button>
                                        </div>
                                        <div>
                                            <i style={{fontSize: '0.75rem'}}>Note: price 0 means open offers</i>
                                        </div>
                                    </>
                                }
                                {
                                    Object.keys(bids).length > 0 && <>
                                        <h4>Offers</h4>
                                        {
                                            Object.entries(bids).map(([ft_token_id, {owner_id, price}]) => <div
                                                className="offers" key={ft_token_id}>
                                                <div>
                                                    {price === '0' ? 'open' : formatNearAmount(price, 4)} - {token2symbol[ft_token_id]}
                                                </div>
                                                <button onClick={() => handleAcceptOffer(token_id, ft_token_id)}>Accept</button>
                                            </div>)
                                        }
                                    </>
                                }
                            </>
                            :
                            <div className="center">
                                <button onClick={() => handleRegisterStorage()}>Register with Market to Sell
                                </button>
                            </div>
                    }
                </div>)
                : <h4>Loading...</h4>
            }

    </TradeCardsLayout>
}
