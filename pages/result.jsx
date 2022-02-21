import {Container, Row, Col } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarOfDavid} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {AcceptButton} from "../components/styled-components";
import styled from "styled-components";

const ResultFont = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 68px;
    line-height: 64px;
    text-align: center;
    color: #364EA0;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`



export default  function Result() {
    return <Container>
        <Row className='mt-5 justify-content-center '>
            <Row className='col-3 justify-content-center'>
                <FontAwesomeIcon style={{fontSize: "200px"}} icon={faStarOfDavid} />
            </Row>
            <Col className='col-auto align-self-center'>
                <ResultFont className='text-center'>2:0</ResultFont>
            </Col>
            <Row className='col-3 justify-content-center d-inline-flex'>
                <FontAwesomeIcon style={{fontSize: "200px"}} icon={faStar} />
            </Row>
        </Row>
        <ResultFont className='my-4 text-center'>You won 2 N</ResultFont>
        <Row className='justify-content-center'>
            <Col className='col-auto mt-5'>
                <Link href='/'><AcceptButton >OKAY</AcceptButton></Link>
            </Col>
        </Row>
    </Container>
}