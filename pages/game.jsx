import {Container, Row, Col, Button, Dropdown, ButtonGroup} from "react-bootstrap";
import {CircleBtn, PlayingCard} from "../components/styled-components";
import styled from "styled-components";
import {useRouter} from "next/router";

const Field = styled.div`
    background-color: aqua;
    border-radius: 30px;
    height: 500px;
`

const LogoSquare = styled.div`
  background-color: cornflowerblue;
  height: 60px;
  width: 60px;
  border-radius: 10px;
`


const SelectDropdownBtn = styled(Button)`
  width: 300px;
`

const BenchRow = styled(Row)`
  margin-top: 170px;
`

const Timer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: dodgerblue;
  padding: 5px 20px;
  font-size: 30px;
  border-radius: 0 0 0 15px;
`


export default function Game() {
    const router = useRouter();

    return <Container>
        <Row className='mt-4'>
            <Col className='text-center' xs={5}>
                <h1>2</h1>
                <Field onClick={()=>router.replace('/result')} />
                <Row className='mt-4 justify-content-between'>
                    <Col className='col-auto'>
                        <Button>Take OT</Button>
                    </Col>
                    <Col className='col-auto'>
                        <Button>Empty net</Button>
                    </Col>
                    <Col className='col-auto'>
                        <Button>Take speech</Button>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col xs={1}>
                        <CircleBtn className='mb-2 first' variant='outline-primary'>1</CircleBtn>
                        <CircleBtn className='mb-2'>2</CircleBtn>
                        <CircleBtn className='mb-2'>3</CircleBtn>
                        <CircleBtn>4</CircleBtn>
                    </Col>
                    <Col xs={8}>
                        <Row className='justify-content-start'>
                            <Col className='col-auto'>
                                <LogoSquare />
                            </Col>
                            <Col className='col-auto'>
                                <h1>2 - 0</h1>
                            </Col>
                            <Col className='col-auto'>
                                <LogoSquare />
                            </Col>
                        </Row>
                        <Row className='mt-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard />
                            </Col>
                        </Row>
                        <Row className='mt-3 mb-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-left' />
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-right' />
                            </Col>
                        </Row>
                        <Dropdown as={ButtonGroup} className='mt-5 mb-3'>
                            <SelectDropdownBtn variant='outline-primary'>-Select-</SelectDropdownBtn>
                            <Dropdown.Toggle variant='outline-primary' />
                            <Dropdown.Menu>
                                <Dropdown.Item>Genius</Dropdown.Item>
                                <Dropdown.Item>Stylisation</Dropdown.Item>
                                <Dropdown.Item>Postmodern joke</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <input type='range' className='form-range' min='0' max='4'/>
                    </Col>
                    <Col>
                        <PlayingCard className='goalie-game' />
                        <BenchRow className='justify-content-center'>
                            <Col xs={1} className='m-0'>
                                <PlayingCard className='sm border' />
                            </Col>
                            <Col className='m-0'>
                                <PlayingCard className='sm border' />
                            </Col>
                        </BenchRow>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Timer>2:32</Timer>
    </Container>
}