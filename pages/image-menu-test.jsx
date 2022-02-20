import {Col, Container, Row} from "react-bootstrap";
import Draggable from "react-draggable";
import styled from "styled-components";

const BgRow = styled(Row)`
  height: 100vh;
`

const DraggableImg = styled.div`
  content: url("/nft.jpg");
`;

export default function ImageMenu() {
    return <Container fluid>
        <BgRow className='justify-content-center'>
            <Col className='col-auto align-self-center'>
                <Draggable
                    bounds={'body'}
                >
                    <DraggableImg />
                </Draggable>
            </Col>
        </BgRow>
    </Container>
}
