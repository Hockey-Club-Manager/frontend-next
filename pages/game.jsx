import {Container, Row, Col, Button, Dropdown, ButtonGroup} from "react-bootstrap";
import {CircleBtn, PlayingCard} from "../components/styled-components";
import styled from "styled-components";
import {useRouter} from "next/router";

const Field = styled.div`
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(65, 95, 202, 0.5), rgba(65, 95, 202, 0.5)), radial-gradient(362.94% 105.95% at 50% 53.43%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 56, 255, 0.8) 81.77%);
    border-radius: 30px;
    height: 500px;
    min-width: 300px;
    text-align: center;
`
const GameButtons = styled(Button)`
        background: #5575E1;
        border-radius: 13px;
        font-family: Venture13;
        font-style: normal;
         font-weight: normal;
        font-size: 24px;
        line-height: 23px;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 10px;
        margin: 10px;
    `

const LogoSquare = styled.div`
  background: #364EA0;
    border: 20px solid #364EA0;
    box-sizing: border-box;
    border-radius: 20px;
    height: 60px;
    width: 60px;
    border: 4px solid #E6A71E;
    box-sizing: border-box;
`


const SelectDropdownBtn = styled(Button)`
     width: 300px;
     background: rgba(255, 255, 255, 0.9);
     border: 2px solid #364EA0;
`

const SelectDropdown = styled(Dropdown.Toggle)`
     background: rgba(255, 255, 255, 0.9);
     border: 2px solid #364EA0;
`

const BenchRow = styled(Row)`
  margin-top: 170px;
`

const Timer = styled.div`
  max-width: 233px;
  max-height: 80px;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(54, 78, 160, 0) 0%, rgba(54, 78, 160, 0.4) 100%);
  padding: 5px 20px;
  font-size: 30px;
  border-radius: 0 0 0 15px;
  & p{text-align: center; margin: 0px;}
`

export default function Game() {
    const router = useRouter();

    return <Container>

        <Row className='mt-4'>
            <Timer><p>2:32</p></Timer>
            <Col className='text-center' xs={5}>
                <h1>2</h1>
                <Field onClick={() => router.replace('/result')}/>
                <Row className='mt-4 justify-content-between'>
                    <Col className='col-auto'>
                        <GameButtons>Take OT</GameButtons>
                    </Col>
                    <Col className='col-auto'>
                        <GameButtons>Empty net</GameButtons>
                    </Col>
                    <Col className='col-auto'>
                        <GameButtons>Take speech</GameButtons>
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
                                <LogoSquare/>
                            </Col>
                            <Col className='col-auto'>
                                <h1>2 - 0</h1>
                            </Col>
                            <Col className='col-auto'>
                                <LogoSquare/>
                            </Col>
                        </Row>
                        <Row className='mt-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard/>
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard/>
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard/>
                            </Col>
                        </Row>
                        <Row className='mt-3 mb-5 justify-content-around'>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-left'/>
                            </Col>
                            <Col className='col-auto'>
                                <PlayingCard className='bottom-right'/>
                            </Col>
                        </Row>
                        <Row>
                            <Dropdown as={ButtonGroup} className='mt-5 mb-3'>
                                <SelectDropdownBtn variant='outline-primary'>-Select-</SelectDropdownBtn>
                                <SelectDropdown variant='outline-primary'/>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Genius</Dropdown.Item>
                                    <Dropdown.Item>Stylisation</Dropdown.Item>
                                    <Dropdown.Item>Postmodern joke</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        <input type='range' className='form-range' min='0' max='4'/>
                        </Row>
                    </Col>
                    <Col>
                        <PlayingCard className='goalie-game'/>
                        <BenchRow className='justify-content-center'>
                            <Col xs={1} className='m-0'>
                                <PlayingCard className='sm border'/>
                            </Col>
                            <Col className='m-0'>
                                <PlayingCard className='sm border'/>
                            </Col>
                        </BenchRow>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}