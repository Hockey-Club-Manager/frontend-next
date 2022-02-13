import {Col, Container, Row} from "react-bootstrap";
import Draggable from "react-draggable";
import styled from "styled-components";

const BgRow = styled(Row)`
  height: 100vh;
`

export default function ImageMenu() {
    return <Container fluid>
        <BgRow className='justify-content-center'>
            <Col className='col-auto align-self-center'>
                <Draggable>
                    <video src='/menu-bg.mp4' autoPlay="autoplay" loop="loop" />
                </Draggable>
            </Col>
        </BgRow>
    </Container>
}
