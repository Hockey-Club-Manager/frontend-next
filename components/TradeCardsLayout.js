import {Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Nav, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import styled from "styled-components";

const TradeSearch = styled(Form.Control)`
    max-width: 600px;
    height: 47px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #364EA0;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 0 auto;
    
`

const TradeDropdownsContainer = styled(Col)`
    min-width: 100px;
    max-width: 300px;
`

const TradeButton = styled(Button)`
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #364EA0;
    box-sizing: border-box;
    border-radius: 10px;
    color: #364EA0;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Venture13;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 23px;
`


export default function TradeCardsLayout({children}) {
    const router = useRouter();

    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>
                        <FontAwesomeIcon icon={faArrowLeft} width='25'/>
                    </Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link href='/trade-cards/buy-packs' disabled={router.asPath === '/trade-cards/buy-packs'}>Buy
                            packs</Nav.Link>
                        <Nav.Link href='/trade-cards/buy-cards' disabled={router.asPath === '/trade-cards/buy-cards'}>Buy
                            cards</Nav.Link>
                        <Nav.Link href='/trade-cards/sell-cards' disabled={router.asPath === '/trade-cards/sell-cards'}>Sell
                            cards</Nav.Link>
                        <Nav.Link href='/trade-cards/free-agents'
                                  disabled={router.asPath === '/trade-cards/free-agents'}>Free agents</Nav.Link>
                    </Nav>
                    <Navbar.Brand href='/'>
                        <img alt='Logo' src='/logo.png' width='40' className='d-inline-block align-top'/>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row style={{maxHeight: "40px", alignItems: "center"}} className='mt-4 mx-3'>
                    <Col className='col-8'>
                        <Form>
                            <Form.Group>
                                <TradeSearch type='text' placeholder='-Search-'/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <TradeDropdownsContainer className='col-2'>
                        <Dropdown as={ButtonGroup}>
                            <TradeButton>Filter</TradeButton>
                            <Dropdown.Toggle/>
                            <Dropdown.Menu>
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item>Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </TradeDropdownsContainer>
                    <TradeDropdownsContainer className='col-2'>
                        <Dropdown as={ButtonGroup}>
                            <TradeButton>Sort</TradeButton>
                            <Dropdown.Toggle/>
                            <Dropdown.Menu>
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item>Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </TradeDropdownsContainer>
                </Row>
                {children}
            </Container>

        </>
    )
}