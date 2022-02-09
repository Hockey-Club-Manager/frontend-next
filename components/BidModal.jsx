import {SModal} from "./settings";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {nanoid} from "nanoid";

export default function BidModal({show, onHide, onBtnClick, content}) {
    return <SModal show={show} onHide={onHide} centered>
    <Modal.Header closeButton />
    <Modal.Body>
        <Form>
            {content.map(c => <Row key={nanoid()}>
                <Col>
                    {c}
                </Col>
            </Row>)}
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control type='text' />
                    </Form.Group>
                </Col>
                <Col><h2>Ⓝ</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={onBtnClick}>Offer</Button>
                </Col>
            </Row>
        </Form>
    </Modal.Body>
</SModal>
}
