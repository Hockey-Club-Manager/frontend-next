import {Col, Container, Dropdown, DropdownButton, Form, Nav, Navbar, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

export default function TradeCardsLayout({children}) {
    const router = useRouter();

    return (
        <>
           <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>
                        <FontAwesomeIcon icon={faArrowLeft} width='25' />
                    </Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link href='/trade-cards/buy-packs' disabled={router.asPath === '/trade-cards/buy-packs'}>Buy packs</Nav.Link>
                        <Nav.Link href='/trade-cards/buy-cards' disabled={router.asPath === '/trade-cards/buy-cards'}>Buy cards</Nav.Link>
                        <Nav.Link href='/trade-cards/sell-cards' disabled={router.asPath === '/trade-cards/sell-cards'}>Sell cards</Nav.Link>
                        <Nav.Link href='/trade-cards/free-agents' disabled={router.asPath === '/trade-cards/free-agents'}>Free agents</Nav.Link>
                        <Nav.Link href='/trade-cards/mint-nft' disabled={router.asPath === '/trade-cards/mint-nft'}>Mint NFT</Nav.Link>
                    </Nav>
                    <Navbar.Brand href='/'>
                        <img alt='Logo' src='/logo.png' width='40' className='d-inline-block align-top' />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Row className='mt-4 mx-3'>
                <Col className='col-8'>
                    <Form>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Search' />
                        </Form.Group>
                    </Form>
                </Col>
                <Col className='col-2'>
                    <DropdownButton title='Filter'>
                        <Dropdown.Item>by something</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col className='col-2'>
                    <DropdownButton title='Sort'>
                        <Dropdown.Item>by something</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            {children}
        </>
    )
}