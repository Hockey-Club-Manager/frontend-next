import Link from "next/link";
import {SModal} from "./settings";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {nanoid} from "nanoid";
import {AcceptButton} from "./styled-components";
import styled from "styled-components";


const BidFont =  styled(Col)`
    font-family: 'Orbitron', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 60px;
    line-height: 56px;
    text-align: center;
    color: #364EA0; 
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const PlayModalContainer = styled(Col)`
    display: flex;
    justify-content: center; 
    padding: 30px;
`

const PlayModalInputContainer = styled(Row)`
     display: flex;
    justify-content: center; 
    align-items: center;
    padding: 30px;
`

const BidModalContainer = styled(SModal)`
    .modal-content{
        background: #ffff;
    }
    .modal-header{
        border: none;
    }
`

export default function BidModal({show, onHide, onBtnClick, content}) {
    return <BidModalContainer show={show} onHide={onHide} centered>
    <Modal.Header closeButton />
    <Modal.Body>
        <Form>
            {content.map(c => <Row key={nanoid()}>
                <BidFont>
                    {c}
                </BidFont>
            </Row>)}
            <PlayModalInputContainer>
                <Col>
                    <Form.Group style={{display: "flex", flexDirection: "row"}}>
                        <Form.Control  type='text' />
                        <h2 style={{padding: "10px"}}>Ⓝ</h2>
                    </Form.Group>
                </Col>

            </PlayModalInputContainer>
            <Row>
                <PlayModalContainer>
                    <Link href='/game'><AcceptButton onClick={onBtnClick}>Offer</AcceptButton></Link>
                </PlayModalContainer>
            </Row>
        </Form>
    </Modal.Body>
</BidModalContainer>
}
