import {Col, Row} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {getObjects} from "../../../utils/near";
import {loadAllTokens, loadSales} from "../../../state/views";
import {utils} from "near-api-js";

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [market, setMarket] = useState();
    const [accountID, setAccountID] = useState();

    function loadCards() {
        loadSales().then(sales => {
            loadAllTokens().then(r => {
                setMarket(sales.concat(r.filter(({token_id}) => !sales.some(({token_id: t}) => t === token_id))));
                setIsLoaded(true);
            });
        });

        getObjects().then(r => {
            const {wallet} = r;
            setAccountID(wallet.accountId)
        });
    }

    useEffect(() => {
        loadCards();
    }, []);

    return <TradeCardsLayout>
        { isLoaded ?
            market?.map(({
                         metadata: {media, title, extra},
                         owner_id,
                         token_id,
                         sale_conditions,
                     }) =>
                <div key={token_id} className="item">
                    <p>{accountID !== owner_id ? `Owned by ${owner_id}` : `You own this!`}</p>
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
                            cost={utils.format.formatNearAmount(sale_conditions?.near)}
                        />
                    </Row>
                </div>)
            : <h4>Loading...</h4>
        }
    </TradeCardsLayout>
};
