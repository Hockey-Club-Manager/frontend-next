import {Container, Row, Col, Button} from 'react-bootstrap';
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";

const CardInfo = styled.div`
  background-color: aquamarine;
  border-radius: 20px;
  padding: 30px;
`

export default function BuyCardView(ctx) {
    return <Container>
        <Row>
            <Col className='col-4'>

                <NFTCard
                    imgURL='/nft.png'
                    year={2022}
                    position='LW'
                    name='Player #12'
                    number={99}
                    role='Best player ever'
                    stats={[99,88,77,66,55]}
                />
            </Col>
            <Col className='col-8'>
                        <CardInfo>
                            <h1>Card info</h1>
                            <h2>Other card info</h2>
                            <h3>Even more info</h3>
                        </CardInfo>
                <Row className='justify-content-center mt-2'>
                    <Col className='col-auto'>
                        <Button variant='secondary'>Buy for 6 Ⓝ</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}