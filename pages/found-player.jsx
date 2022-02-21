import Link from "next/link";
import {Container, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {AcceptButton, CancelButton, OrbitronFont} from "../components/styled-components";

const StyledBackground = styled(Container)`
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(65, 95, 202, 0.5), rgba(65, 95, 202, 0.5)), radial-gradient(362.94% 105.95% at 50% 53.43%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 56, 255, 0.8) 81.77%);
    filter: blur(20px);
    border-radius: 30px;
`

export default function FoundPlayer() {
    return <Container>
        <OrbitronFont><h1 className="my-5 text-center">Username</h1></OrbitronFont>
        <Row className='justify-content-center'>
            <Row className='col-3 justify-content-center'>
                <FontAwesomeIcon style={{fontSize: "200px"}} icon={faStar} />
            </Row>
        </Row>
        <Row className='my-3'>
            <Col>
                <OrbitronFont><h2 className='text-center'>99 88 77</h2></OrbitronFont>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col className='col-auto'>
                <CancelButton>Search again</CancelButton>
            </Col>
            <Col className='col-auto'>
                <Link href='/game'><AcceptButton>Play</AcceptButton></Link>
            </Col>
        </Row>
    </Container>
}