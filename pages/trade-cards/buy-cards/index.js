import {Row, Col} from "react-bootstrap";
import TradeCardsLayout from "../../../components/TradeCardsLayout";
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";

const CardCol = styled(Col)`
  width: 300px;
`

export default function Index() {
 return <TradeCardsLayout>
  <Row className='mx-4 my-4 gx-4 gy-4'>
   <CardCol className='col-4 mx-3'>
    <NFTCard
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
    />
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <span><a
          href="https://paras.id/let45fc.near/collectibles"
          className='text-decoration-none'
          target='_blank'
          rel="noreferrer"
      >let45fc.near</a> - 3 Ⓝ</span>
     </Col>
    </Row>
   </CardCol>
   <CardCol className='col-4 mx-3'>
    <NFTCard
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
    />
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <span><a
          href="https://paras.id/let45fc.near/collectibles"
          className='text-decoration-none'
          target='_blank'
          rel="noreferrer"
      >let45fc.near</a> - 3 Ⓝ</span>
     </Col>
    </Row>
   </CardCol>
   <CardCol className='col-4 mx-3'>
    <NFTCard
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
    />
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <span><a
          href="https://paras.id/let45fc.near/collectibles"
          className='text-decoration-none'
          target='_blank'
          rel="noreferrer"
      >let45fc.near</a> - 3 Ⓝ</span>
     </Col>
    </Row>
   </CardCol>
   <CardCol className='col-4 mx-3'>
    <NFTCard
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
    />
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <span><a
          href="https://paras.id/let45fc.near/collectibles"
          className='text-decoration-none'
          target='_blank'
          rel="noreferrer"
      >let45fc.near</a> - 3 Ⓝ</span>
     </Col>
    </Row>
   </CardCol>
   <CardCol className='col-4 mx-3'>
    <NFTCard
        imgURL='/nft.jpg'
        year={2022}
        position='LW'
        name='Player #12'
        number={99}
        role='Best player ever'
        stats={[99,88,77,66,55]}
        detailsLink="/trade-cards/buy-cards/1"
    />
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <span><a
          href="https://paras.id/let45fc.near/collectibles"
          className='text-decoration-none'
          target='_blank'
          rel="noreferrer"
      >let45fc.near</a> - 3 Ⓝ</span>
     </Col>
    </Row>
   </CardCol>
  </Row>
 </TradeCardsLayout>
}
