import {Container, Row, Col, Button, Dropdown, ButtonGroup} from "react-bootstrap";
import {PlayingCard} from "../components/styled-components";
import styled from "styled-components";
import {useRouter} from "next/router";

const Field = styled.div`
  background-color: #ffffff;
  background-image: url("/field-background.png");
  border-radius: 30px;
  background-size: auto 500px;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  overflow: auto;
`

const LogoSquare = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  border: 3px solid white;

  &.u-1 {
    background-color: #5161ee;
  }

  &.u-2 {
    background-color: #ef615f;
  }
`


const SelectDropdownBtn = styled(Button)`
  width: 300px;
`

const BenchRow = styled(Row)`
  margin-top: 80px;
`

const Timer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: dodgerblue;
  padding: 5px 20px;
  font-size: 30px;
  border-radius: 0 0 0 15px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
`

const MessageDiv = styled.div`
  background-color: #bfbfbf;
  
  &.left {
    border: 2px solid #5161ee;
  }
  &.right {
    border: 2px solid #ef615f;
  }
`

function Message({playerWithThePuck, action, opponent, username, side}) {
    return <MessageDiv className={side}>
        <div className="username">{username}</div>
        <p>{playerWithThePuck} {action} {opponent}</p>
    </MessageDiv>
}

export default function Game() {
    const router = useRouter();

    return <Container>
        <Row className='mt-4'>
            <Col className='text-center' xs={5}>
                <h1>Period 2</h1>
                <Field>
                    <Message playerWithThePuck={3} action='Battle' opponent={4} side='left' username='kastet99.near' />
                    <Message playerWithThePuck={8} action='Battle' opponent={6} side='right' username='let45fc.near' />
                </Field>
                <Row className='mt-4 justify-content-between'>
                    <Col className='col-auto'>
                        <Button>Take TO</Button>
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
                    <Col xs={8}>
                        <Row className='justify-content-start'>
                            <Col className='col-auto'>
                                <LogoSquare className='u-1' />
                            </Col>
                            <Col className='col-auto'>
                                <h1>2 - 0</h1>
                            </Col>
                            <Col className='col-auto'>
                                <LogoSquare className='u-2' />
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
                            <SelectDropdownBtn variant='outline-primary'>Tactics</SelectDropdownBtn>
                            <Dropdown.Toggle variant='outline-primary' />
                            <Dropdown.Menu>
                                <Dropdown.Item>Not </Dropdown.Item>
                                <Dropdown.Item>yet</Dropdown.Item>
                                <Dropdown.Item>implemented</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <PlayingCard className='goalie-game' />
                        <BenchRow className='justify-content-center'>
                            <Col xs={1} className='m-0'>
                                <PlayingCard className='sm bench'>
                                    <img src='/card-back-yellow.png' />
                                </PlayingCard>
                            </Col>
                            <Col className='m-0'>
                                <PlayingCard className='sm bench'>
                                    <img src='/card-back-blue.png' />
                                </PlayingCard>
                            </Col>
                        </BenchRow>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Timer>2:32</Timer>
    </Container>
}
