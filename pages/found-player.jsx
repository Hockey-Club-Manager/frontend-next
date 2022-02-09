import Link from "next/link";
import {Container, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export default function FoundPlayer() {
    return <Container>
        <h1 className="my-5 text-center">Username</h1>
        <Row className='justify-content-center'>
            <Col className='col-3'>
                <FontAwesomeIcon icon={faStar} />
            </Col>
        </Row>
        <Row className='my-3'>
            <Col>
                <h2 className='text-center'>99 88 77</h2>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col className='col-auto'>
                <Button>Search again</Button>
            </Col>
            <Col className='col-auto'>
                <Link href='/game'><a className='btn btn-primary' type='button' role='button'>Play</a></Link>
            </Col>
        </Row>
    </Container>
}