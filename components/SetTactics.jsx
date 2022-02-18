import React, {useState} from "react";
import {Button, DropdownButton, Dropdown, Row, Col, Modal, Form} from "react-bootstrap";
import styled from "styled-components";
import {AcceptButton, CancelButton} from "./styled-components";


const SelectTacticInputsBar = styled.ol`
     display: flex;
     justify-content: space-between;
     max-width: 500px;
     margin: 0 auto;
     
     

`;

const ButtonsContainerTactics = styled(Modal.Footer)`
        display: flex;
       justify-content: space-around;
       margin: 0 auto;
       width: 50%;


`

function SelectTactic() {
    const [rangeValue, setRangeValue] = useState(0)

    return (
        <div className="dropdown">
            <SelectTacticInputsBar className="d-grid gap-5">
                <li>
                    <SelectTacticInputsBar>
                        <DropdownButton id="dropdown-basic-button" size="lg" title="-SELECT-">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Form.Range

                                    value={rangeValue}
                                    onChange={e => setRangeValue(e.target.value)}
                                    step={10}
                        />
                    </SelectTacticInputsBar>
                </li>
                <li>
                    <SelectTacticInputsBar>
                        <DropdownButton id="dropdown-basic-button" size="lg" title="-SELECT-">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Form.Range

                                    value={rangeValue}
                                    onChange={e => setRangeValue(e.target.value)}
                                    step={10}
                        />
                    </SelectTacticInputsBar>
                </li>
                <li>
                    <SelectTacticInputsBar>
                        <DropdownButton id="dropdown-basic-button" size="lg" title="-SELECT-">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Form.Range

                                    value={rangeValue}
                                    onChange={e => setRangeValue(e.target.value)}
                                    step={10}
                        />
                    </SelectTacticInputsBar>
                </li>
            </SelectTacticInputsBar>
        </div>
    )
}

export default function SetTactics() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Set tactics
            </Button>

            <Modal fullscreen={true} show={show} onHide={handleClose} animation={true}>
                <Modal.Body>
                    <Row className='justify-content-center mt-4'>
                        <SelectTactic/>
                    </Row>
                </Modal.Body>
                <ButtonsContainerTactics>
                        <Col  xs="auto">
                            <CancelButton variant="secondary" onClick={handleClose}>
                                Cancel
                            </CancelButton>
                        </Col>
                        <Col xs="auto">
                            <AcceptButton  variant="primary" onClick={handleClose}>
                                Apply
                            </AcceptButton>
                        </Col>
                </ButtonsContainerTactics>
            </Modal>
        </>

    )
}