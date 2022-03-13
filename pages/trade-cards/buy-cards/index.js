import {Col, Row} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";
import React, {useState} from "react";
import {formatNearAmount, getObjects, token2symbol} from "../../../utils/near";
import {loadAllTokens, loadSales} from "../../../state/views";

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
    const [market, setMarket] = useState();
    const [accountID, setAccountID] = useState();

    function urii () {

    let sales;
    loadSales().then(r => {
        sales = r;
        console.log(sales)
        loadAllTokens().then(r => {
            console.log('r: ', r);

            //const {allTokens: _allTokens} = r;
            //setMarket(sales.concat(_allTokens.filter(({token_id}) => !sales.some(({token_id: t}) => t === token_id))));

            setMarket(sales.concat(r.filter(({token_id}) => !sales.some(({token_id: t}) => t === token_id))));
        })
    })

    let wallet;
    getObjects().then(r => {
        const {wallet: _wallet} = r;
        wallet = _wallet;
        setAccountID(_wallet.accountId)
    });

    console.log(sales);

    }
    return <TradeCardsLayout>
        <button onClick={()=>urii()}>uriy</button>
        {
            market?.map(({
                         metadata: {media, title, extra},
                         owner_id,
                         token_id,
                         sale_conditions = {},
                     }) =>
                <div key={token_id} className="item">
                    <p>{accountID !== owner_id ? `Owned by ${owner_id}` : `You own this!`}</p>

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
                                position={extra && JSON.parse(extra).position}
                                name={title}
                                number={extra && JSON.parse(extra).number}
                                role={extra && JSON.parse(extra).role}
                                stats={extra && JSON.parse(extra).stats}
                                detailsLink="/trade-cards/buy-cards/1"
                                cost={3}
                            />
                        </Row>


                </div>)
        }
    </TradeCardsLayout>
};
