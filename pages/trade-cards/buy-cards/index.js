import {Row, Col} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";
import React, {useContext, useEffect} from "react";
import {appStore} from "../../../state/app";
import {
    formatNearAmount,
    getMarketContract,
    getObjects,
    token2symbol
} from "../../../utils/near";
import {getMarketStoragePaid, loadAllTokens, loadItems, loadSales} from "../../../state/views";

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

export default function Index() {
    let sales, allTokens;
    loadSales().then(r => {
        sales = r;
        console.log(sales)
    })
    console.log(sales)

    loadAllTokens().then(r => {
        console.log(r);

        const {allTokens: _allTokens} = r;
        allTokens = _allTokens;
    })

    let wallet;
    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;
    });

    let accountId = '';
    if (wallet) accountId = wallet.accountId;

    console.log(sales);

    const currentSales = sales.filter(({
                                           owner_id,
                                           sale_conditions
                                       }) => wallet?.accountId === owner_id && Object.keys(sale_conditions || {}).length > 0)


    let market = sales;

    market = market.concat(allTokens.filter(({token_id}) => !market.some(({token_id: t}) => t === token_id)));


    return <TradeCardsLayout>
        {
            market.map(({
                         metadata: {media, title, extra},
                         owner_id,
                         token_id,
                         sale_conditions = {},
                     }) =>
                <div key={token_id} className="item">
                    <p>{accountId !== owner_id ? `Owned by ${owner_id}` : `You own this!`}</p>

                    {
                        Object.keys(sale_conditions).length > 0 && <>
                            <h4>Sale Conditions</h4>
                            {
                                Object.entries(sale_conditions).map(([ft_token_id, price]) => <div className="margin-bottom"
                                                                                                   key={ft_token_id}>
                                    {price === '0' ? 'open' : formatNearAmount(price, 4)} - {token2symbol[ft_token_id]}
                                </div>)
                            }
                        </>
                    }

                        <Row className='mx-4 my-4 gx-4 gy-4'>
                            <NFTCardCol
                                imgURL={media}
                                year={2022}
                                position={JSON.parse(extra).position}
                                name={title}
                                number={JSON.parse(extra).number}
                                role={JSON.parse(extra).role}
                                stats={JSON.parse(extra).stats}
                                detailsLink="/trade-cards/buy-cards/1"
                                cost={3}
                            />
                        </Row>


                </div>)
        }
    </TradeCardsLayout>
};
