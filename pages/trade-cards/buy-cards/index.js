import {Row, Col} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
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

export default function Index() {
 return <TradeCardsLayout>
  <Row className='mx-4 my-4 gx-4 gy-4'>
    <NFTCardCol
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
        cost={3}
    />
  </Row>
 </TradeCardsLayout>
}
