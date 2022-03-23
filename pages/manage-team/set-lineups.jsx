import {Container, Row, Col, Button} from "react-bootstrap";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowUp, faArrowDown, faTimes} from "@fortawesome/free-solid-svg-icons";
import {CircleBtn, PlayingCard, UnselectedCard} from "../../components/styled-components";
import {useEffect, useState} from "react";





const SContainer = styled(Container)`
    svg[data-prefix="fas"] {
      width: 25px;
    }
`
const CircleButtons = styled(Col)`
   
   max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
`

const TopSelectedCard = styled(Col)`
    max-width: 900px
`

const SelectedPlayingCard = styled(Col)`
    width:500px;
    margin: 0 auto;
    display:flex;
    justify-content: space-around;
`

const ActionButton = styled(Button)`
  width: 100px;
`

export default function SetLineup() {



    const [allPlayingCards, setAllPlayingCards] = useState( [
        {cardName: 1, cardImage: "/card-back-blue.png"},
        {cardName: 2, cardImage: "/card-back-yellow.png"},
        {cardName: 3, cardImage: "/card-back-blue.png"},
        {cardName: 4, cardImage: "/card-back-yellow.png"},
        {cardName: 5, cardImage: "/card-back-blue.png"},
        {cardName: 6, cardImage: "/card-back-blue.png"},
        {cardName: 7, cardImage: "/card-back-blue.png"},

    ])

    const [activeCards, setActiveCards] = useState([
        {cardName: 8, cardImage: "/card-back-blue.png", position: 1},
        {cardName: 9, cardImage: "/card-back-yellow.png",position: 2},
        {cardName: 10, cardImage: "/card-back-blue.png",position: 3},
    ])

    const [selectedCard, setSelectedCard] = useState()
    const [selectedActiveCard, setSelectedActiveCard] = useState()

    useEffect(() => {

        if(selectedCard && selectedActiveCard){
            setAllPlayingCards([...allPlayingCards, activeCards.find(e=> e.cardName === selectedActiveCard)])
            setActiveCards([...activeCards, allPlayingCards.find(e => e.cardName === selectedCard)])
            setActiveCards(items => items.filter(filt => filt.cardName !== selectedActiveCard))
            setAllPlayingCards(items => items.filter(filt => filt.cardName !== selectedCard))
            setSelectedCard(null)
            setSelectedActiveCard(null)
        }

    }, [selectedCard, selectedActiveCard])

    const selectActiveCard = (selectedCard) => {
        setSelectedActiveCard(selectedCard)
    }

    const selectCard = (card) => {
        setSelectedCard(card)
    }

    console.log(activeCards)

    return <SContainer fluid className='p-3'>
        <Row className='justify-content-between'>
            <Col className='col-auto'>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Col>
            <Col className='col-auto'>
                <FontAwesomeIcon icon={faTimes}/>
            </Col>
        </Row>
        <Row>
            <CircleButtons xs={1}>
                <CircleBtn className='mb-2 ' variant='outline-primary'>1</CircleBtn>
                <CircleBtn className='mb-2'>2</CircleBtn>
                <CircleBtn className='mb-2'>3</CircleBtn>
                <CircleBtn className='mb-2'>4</CircleBtn>
            </CircleButtons>
            <TopSelectedCard xs={8}>
                <SelectedPlayingCard style={{width: "500px", margin: "0 auto"}}>
                    {activeCards.map(e => {

                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} onClick={() => selectActiveCard(e.cardName)} /></Col>

                    })}
                </SelectedPlayingCard>
                <SelectedPlayingCard className='mt-3 mb-5 justify-content-around'>
                    <Col className='col-auto'>
                        <PlayingCard className='bottom-left'/>
                    </Col>
                    <Col className='col-auto'>
                        <PlayingCard className='bottom-right'/>
                    </Col>
                </SelectedPlayingCard>
                <Row>
                    <Col xs={11}>
                        <Row>
                            {allPlayingCards.map(e => {
                                return <Col key={e.cardName}><PlayingCard onClick={()=> selectCard(e.cardName)}  image={e.cardImage}/></Col>
                            })}

                        </Row>
                    </Col>
                    <Col xs={1}>
                        <FontAwesomeIcon icon={faArrowUp} className='mt-3'/>
                        <h4>1/3</h4>
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </Col>
                </Row>
            </TopSelectedCard>
            <Col xs={3}>
                <PlayingCard className='goalie'/>
                <ActionButton variant='warning' className='mt-4 mb-2'>Auto</ActionButton>
                <Row>
                    <ActionButton variant='danger' className='mt-5 mb-2'>Cancel</ActionButton>
                    <ActionButton variant='success' className='mt-5 mb-2'>Apply</ActionButton>
                </Row>
            </Col>
        </Row>
    </SContainer>
}