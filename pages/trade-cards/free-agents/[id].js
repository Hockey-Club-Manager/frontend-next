import styled from "styled-components";
import {useState} from "react";
import {Button, Col, Container, Form, Modal, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import NFTCard from "../../../components/NFTCard";
import InfoModal from "../../../components/InfoModal";

const CardInfo = styled.div`
  background-color: aquamarine;
  border-radius: 20px;
  padding: 30px;
`

export default function FreeAgentsView(ctx) {
    const [showAgentTakeback, setShowAgentTakeback] = useState(false);
    const handleAgentTakebackOpen = () => setShowAgentTakeback(true);
    const handleAgentTakebackClose = () => setShowAgentTakeback(false);

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
                            <Button variant='secondary' onClick={handleAgentTakebackOpen}>Buy for 6 Ⓝ</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <InfoModal
                show={showAgentTakeback}
                onHide={handleAgentTakebackClose}
                onBtnClick={handleAgentTakebackClose}
                content={[
                    <h3 key='takeback'>You are taking <code>Name Surname</code> back on roster</h3>
                ]}
            />
        </Container>
    </>
}
