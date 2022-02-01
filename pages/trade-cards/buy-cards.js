import {Row, Col, Card, Button} from "react-bootstrap";
import TradeCardsLayout from "../../components/TradeCardsLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSass} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";


const SCard = styled(Card)`
 border: none;
 
 .card-img-top {
  border-radius: 20px;
 }
`

export default function BuyCards(ctx) {
 return <TradeCardsLayout>
  <Row className='mx-4 my-4 gx-4 gy-4'>
   <Col className='col-4'>
    <SCard>
     <Card.Img variant='top' src='/nft.png' />
      <Card.ImgOverlay className='d-flex flex-column'>
       <Row className="justify-content-between">
        <Col className='col-auto'>
         <Card.Title className='text-white'>2022</Card.Title>
        </Col>
        <Col className='col-auto'>
         <Card.Title className='text-white'>LW</Card.Title>
        </Col>
       </Row>
       <Row className="justify-content-end">
        <Col className="col-auto">
         <FontAwesomeIcon icon={faSass} size='2x' className='text-white' />
        </Col>
       </Row>
       <div className='mt-auto'>
        <Row className='justify-content-between'>
         <Col className='col-auto'>
          <Card.Title className='text-white'>Дебик #14</Card.Title>
         </Col>
         <Col className='col-auto'>
          <h3 className='text-white'>99</h3>
        </Col>
        </Row>
        <Card.Text className='text-white'>Первый дебик, нарисованный <a>alena.near</a></Card.Text>
        <Row className="justify-content-center">
         <Col className="col-auto">
          <Card.Title className='text-white'>99</Card.Title>
         </Col>
         <Col className="col-auto">
          <Card.Title className='text-white'>88</Card.Title>
         </Col>
         <Col className="col-auto">
          <Card.Title className='text-white'>77</Card.Title>
         </Col>
         <Col className="col-auto">
          <Card.Title className='text-white'>66</Card.Title>
         </Col>
         <Col className="col-auto">
          <Card.Title className='text-white'>55</Card.Title>
         </Col>
        </Row>
       </div>
     </Card.ImgOverlay>
    </SCard>
    <Row className='justify-content-center mt-2'>
     <Col className='col-auto'>
      <Button variant='outline-secondary'>6 Ⓝ</Button>
     </Col>
    </Row>
   </Col>
  </Row>
 </TradeCardsLayout>
}