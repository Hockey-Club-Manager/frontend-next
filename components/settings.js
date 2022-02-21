import {Row, Col, Modal, Form, Button} from 'react-bootstrap';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-solid-svg-icons";
import {AcceptButton, CancelButton} from "./styled-components";

export const SModal = styled(Modal)`
  .modal-content {
    background: linear-gradient(0deg, rgba(65, 95, 202, 0.6), rgba(65, 95, 202, 0.6)), radial-gradient(362.94% 105.95% at 50% 53.43%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 56, 255, 0.8) 81.77%);
    border-radius: 26px;

  }
  
`

const SettingsHeader = styled(Modal.Header)`
    height: 50px;
    border: 2px solid white;
    border-radius: 35px;
    padding: 20px;
    background: #415FCA;
    color: white
`

const SettingsFont = styled(Col)`
    font-family: 'Orbitron', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 29px;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ModalInputsContainer = styled(Row)`
    padding: 20px;
`

export default function Settings({show, setShow}) {
    const handleClose = () => setShow(false);

    return <SModal show={show} onHide={handleClose} centered>
        <SettingsHeader >
            <Modal.Title>Settings</Modal.Title>
        </SettingsHeader>
        <Modal.Body>
            <Form>
                <ModalInputsContainer>
                    <SettingsFont>Your name:</SettingsFont>
                    <Col>
                        <Form.Group>
                            <Form.Control type='text'/>
                        </Form.Group>
                    </Col>
                </ModalInputsContainer>
                <ModalInputsContainer>
                    <SettingsFont>Team name:</SettingsFont>
                    <Col>
                        <Form.Group>
                            <Form.Control type='text'/>
                        </Form.Group>
                    </Col>
                </ModalInputsContainer>
                <ModalInputsContainer>
                    <SettingsFont>Your logo:</SettingsFont>
                    <Col>
                        <FontAwesomeIcon icon={faSquare} size='6x'/>
                    </Col>
                </ModalInputsContainer>
                <ModalInputsContainer>
                    <Col>
                        <AcceptButton >Cancel</AcceptButton>
                    </Col>
                    <Col>
                        <CancelButton >Apply</CancelButton>
                    </Col>
                </ModalInputsContainer>
            </Form>
        </Modal.Body>
    </SModal>
}
