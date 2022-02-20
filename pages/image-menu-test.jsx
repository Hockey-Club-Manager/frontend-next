import {Col, Container, Row} from "react-bootstrap";
import Draggable from "react-draggable";
import styled from "styled-components";

const BgRow = styled(Row)`
  height: 100vh;
`

const DraggableImgContainer = styled.div`
  margin-right: 20vw;
  width: 120vw;
  height: 100vh;
  align-content: center;
`;

const DraggableImg = styled.div`
  content: url("/menu-image.png");
  //width: 100%;
  height: 100%;
`;

export default function ImageMenu() {
    // return <Container fluid>
        {/*<BgRow className='justify-content-center'>*/}
            {/*<Col className='col-auto align-self-center'>*/}
            {/*    <Draggable*/}
            {/*        bounds={'body'}*/}
            {/*    >*/}
            {/*        <DraggableImg />*/}
            {/*    </Draggable>*/}
            {/*</Col>*/}
        {/*</BgRow>*/}
        // </Container>
    return <DraggableImgContainer id={'draggable-img-container'} className='justify-content-center align-content-center align-items-center'>
        <Draggable
            bounds={'#draggable-img-container'}
        >
            <DraggableImg />
        </Draggable>
    </DraggableImgContainer>

    // return <Container fluid>
    // <BgRow className='justify-content-center'>
    // <Col className='col-auto align-self-center'>
    //     <DraggableImgContainer id={'draggable-img-container'} className='justify-content-center '>
    //          <Draggable
    //              bounds={'#draggable-img-container'}
    //          >
    //              <DraggableImg />
    //          </Draggable>
    //      </DraggableImgContainer>
    // </Col>
    // </BgRow>
    // </Container>
}
