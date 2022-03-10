import { Row, Col, Modal, Form, Button } from 'react-bootstrap';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {Player} from "./Audio";


export const SModal = styled(Modal)`
  .modal-content {
    border: 4px solid white;
    border-radius: 35px;
  }
  
  .modal-header {
    border: none;
  }
`

export default function Settings({show, setShow}, props) {
    const [isShowSettings, setIsShowSettings] = useState(false);
    const showSettings = () => setIsShowSettings(true);
    const hideSettings = () => setIsShowSettings(false);
    return <>
    <Button onClick={showSettings}>Settings</Button>
    <SModal show={isShowSettings} onHide={hideSettings} centered>
        <Modal.Header closeButton />
        <Modal.Body>
            <Form>
                <Row>
                    <Col>Your name:</Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type='text' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>Team name:</Col>
                    <Col>
                        <Form.Group>
                            <Form.Control type='text' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>Your logo:</Col>
                    <Col>
                        <FontAwesomeIcon icon={faSquare} size='6x' />
                    </Col>
                </Row>
                <Row>
                    Sound
                    <Player />
                </Row>
                <Row>
                    <Col>
                        <Button>Cancel</Button>
                    </Col>
                    <Col>
                        <Button>Apply</Button>
                    </Col>
                </Row>
            </Form>
        </Modal.Body>
    </SModal>
        </>
}
