import {SModal} from "./settings";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {nanoid} from "nanoid";

export default function BidModal({show, onHide, content, inputValue, onInputChange, onBtnClick}) {
    return <SModal show={show} onHide={onHide} centered>
    <Modal.Header closeButton />
    <Modal.Body>
        <Form>
            {content.map(c => <Row key={nanoid()}>
                <Col>
                    {c}
                </Col>
            </Row>)}
            <Form.Group>
                <div className="input-group input-group-lg" id="big-modal-input">
                    <input type="number" step='0.01' className='form-control' aria-labelledby="big-modal-input"
                        value={inputValue} onChange={onInputChange} />
                    <span className="input-group-text">Ⓝ</span>
                </div>
            </Form.Group>
            <Row className='mt-3 justify-content-center'>
                <Col className='col-auto'>
                    <Button variant='success' onClick={onBtnClick}>Offer</Button>
                </Col>
            </Row>
        </Form>
    </Modal.Body>
</SModal>
}
