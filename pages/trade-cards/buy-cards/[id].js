import {Container, Row, Col, Button, Navbar, Form} from 'react-bootstrap';
import NFTCard from "../../../components/NFTCard";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {SModal} from "../../../components/settings";
import {Modal} from "react-bootstrap";
import {useState} from "react";
import InfoModal from "../../../components/InfoModal";

const CardInfo = styled.div`
  background-color: aquamarine;
  border-radius: 20px;
  padding: 30px;
`

function BidModal({show, onHide, inputValue, onInputChange, onBtnClick}) {
    return <SModal show={show} onHide={onHide} centered>
        <Modal.Header closeButton />
        <Modal.Body>
            <Col>
                <h3>Set your bid for buying a <code>Name</code></h3>
                <h3><code>Surname from CardHolder</code></h3>
            </Col>
            <Row className='mt-3 justify-content-center'>
                <Col className='col-auto'>
                    <Form.Group>
                        <div className="input-group input-group-lg" id="big-modal-input">
                            <input type="number" step='0.01' className='form-control' aria-labelledby="big-modal-input"
                                   value={inputValue} onChange={onInputChange} />
                            <span className="input-group-text">Ⓝ</span>
                        </div>
                    </Form.Group>
                </Col>
                <Col className='col-auto'>
                    <Button variant='success' onClick={onBtnClick}>Offer</Button>
                </Col>
            </Row>
        </Modal.Body>
    </SModal>
}

export default function BuyCardView() {
    const [showBuyCardOfferModal, setShowBuyCardOfferModal] = useState(false);
    const handleBuyCardOfferModalOpen = () => setShowBuyCardOfferModal(true);
    const handleBuyCardOfferModalClose = () => setShowBuyCardOfferModal(false);

    const [showBuyCardConfirmModal, setShowBuyCardConfirmModal] = useState(false);
    const handleBuyCardConfirmModalOpen = () => setShowBuyCardConfirmModal(true);
    const handleBuyCardConfirmModalClose = () => setShowBuyCardConfirmModal(false);

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
                    imgURL='/nft.jpg'
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
                        <Button variant='secondary' onClick={handleBuyCardOfferModalOpen}>Buy for 6 Ⓝ</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <BidModal
            show={showBuyCardOfferModal}
            onHide={handleBuyCardOfferModalClose}
            onBtnClick={() => {
                handleBuyCardOfferModalClose();
                handleBuyCardConfirmModalOpen();
            }}
            content={[
            ]}
        />
        <InfoModal
            show={showBuyCardConfirmModal}
            onHide={handleBuyCardConfirmModalClose}
            onBtnClick={handleBuyCardConfirmModalClose}
            content={[
                <h3 key='buy-cards-confirm-0'>You are buying a <code>Name Surname</code></h3>,
                <h3 key='buy-cards-confirm-1'>from <code>CardHolder</code> for <code>XXX</code> Ⓝ</h3>,
            ]}
            />
    </Container>
    </>
}