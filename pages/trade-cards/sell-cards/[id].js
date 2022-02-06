import styled from "styled-components";
import {useState} from "react";
import {Button, Col, Container, Form, Modal, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import NFTCard from "../../../components/NFTCard";
import {SModal} from "../../../components/settings";

const CardInfo = styled.div`
  background-color: aquamarine;
  border-radius: 20px;
  padding: 30px;
`

export default function SellCardView(ctx) {
    const [showBuyCardPriceModal, setShowBuyCardPriceModal] = useState(false);
    const handleBuyCardPriceModalOpen = () => setShowBuyCardPriceModal(true);
    const handleBuyCardPriceModalClose = () => setShowBuyCardPriceModal(false);

    return <>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/trade-cards/buy-cards'>
                    <FontAwesomeIcon icon={faArrowLeft} width='25' />
                </Navbar.Brand>
                <Navbar.Brand href='/'>
                    <img alt='Logo' src='/logo.png' width='40' className='d-inline-block align-top' />
                </Navbar.Brand>
            </Container>
        </Navbar>
        <Container>
            <Row className='my-5'>
                <Col className='col-12 col-xs-12 col-sm-12 col-md-5 mb-3'>
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
                <Col className='col-12 col-xs-12 col-sm-12 col-md-7'>
                    <CardInfo>
                        <h1>Card info</h1>
                        <h2>Other card info</h2>
                        <h3>Even more info</h3>
                    </CardInfo>
                    <Row className='justify-content-center mt-4'>
                        <Col className='col-auto'>
                            <Button variant='secondary' onClick={handleBuyCardPriceModalOpen}>Buy for 6 Ⓝ</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <SModal show={showBuyCardPriceModal} onHide={handleBuyCardPriceModalClose} centered>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col><h3>Set your price for selling a <code>Name</code></h3></Col>
                        </Row>
                        <Row>
                            <Col><h3><code>Surname</code></h3></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Check />
                                </Form.Group>
                            </Col>
                            <Col><FontAwesomeIcon icon={faInfoCircle} /></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={handleBuyCardPriceModalClose}>Offer</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </SModal>
        </Container>
    </>
}
