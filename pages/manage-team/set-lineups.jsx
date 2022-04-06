import {Container, Row, Col, Button} from "react-bootstrap";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowUp, faArrowDown, faTimes} from "@fortawesome/free-solid-svg-icons";
import {CircleBtn, PlayingCard} from "../../components/styled-components";
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


    const [allPlayingCards, setAllPlayingCards] = useState([
        {cardName: 1, cardImage: "/card-back-blue.png", position: null},
        {cardName: 2, cardImage: "/card-back-yellow.png", position: null},
        {cardName: 3, cardImage: "/card-back-blue.png", position: null},
        {cardName: 4, cardImage: "/card-back-yellow.png", position: null},
        {cardName: 5, cardImage: "/card-back-blue.png", position: null},
        {cardName: 6, cardImage: "/card-back-blue.png", position: null},
        {cardName: 7, cardImage: "/card-back-blue.png", position: null},

    ])

    const [activeCards, setActiveCards] = useState([
        {cardName: "unselected1", cardImage: "ffff", position: 1, isDefined: false,},
        {cardName: "unselected2", cardImage: "ffff", position: 2,isDefined: false},
        {cardName: "unselected3", cardImage: "ffff", position: 3,isDefined: false},
        {cardName: "unselected4", cardImage: "ffff", position: 4,isDefined: false},
        {cardName: "unselected5", cardImage: "ffff", position: 5,isDefined: false},
    ])

    const [selectedCard, setSelectedCard] = useState()
    const [selectedActiveCard, setSelectedActiveCard] = useState([])

    useEffect(() => {

        if (selectedCard && selectedActiveCard && selectedActiveCard.length === 1 && selectedActiveCard[0].isDefined === true) {

                let findedActiveCard = activeCards.find(e => e.cardName === selectedActiveCard[0].card)
                let findedAllCard = allPlayingCards.find(e => e.cardName === selectedCard.card)
                setAllPlayingCards([...allPlayingCards, {position: null, cardName: findedActiveCard.cardName, cardImage: findedActiveCard.cardImage}])
                setActiveCards([...activeCards, {...findedAllCard, position: findedActiveCard.position, isDefined: true}])
                setActiveCards(items => items.filter(filt => filt.cardName !== selectedActiveCard[0].card))
                setAllPlayingCards(items => items.filter(filt => filt.cardName !== selectedCard.card))
                setSelectedCard(null)
                setSelectedActiveCard(null)
        }
        else if(selectedActiveCard && selectedActiveCard.length > 1 ){

            setActiveCards(activeCards.map(e => {
                if(e.cardName === selectedActiveCard[0].card){
                    return  {...e, position: selectedActiveCard[1].position }
                }
                else {return e}

            }))
            setActiveCards(activeCards.map(e => {
                if(e.cardName === selectedActiveCard[1].card){
                    return  {...e, position: selectedActiveCard[0].position }
                }
                else {return e}

            }))

            setSelectedActiveCard(null)
        }
        else if(selectedCard && selectedActiveCard && selectedActiveCard.length === 1 && selectedActiveCard[0].isDefined === false){
            let findedAllCard = allPlayingCards.find(e => e.cardName === selectedCard.card)
            setActiveCards(activeCards.map(e => {
                if(e.position === selectedActiveCard[0].position){
                    return  { position: e.position, cardImage: findedAllCard.cardImage, cardName: findedAllCard.cardName, isDefined: true}
                }
                else {return e}

            }))
            setAllPlayingCards(items => items.filter(filt => filt.cardName !== selectedCard.card))
            setSelectedActiveCard(null)
            setSelectedCard(null)

        }
    }, [selectedCard, selectedActiveCard])
    console.log(activeCards)
    console.log(selectedActiveCard)
    const removeDuplicates = (arr) => {

        const result = [];
        const duplicatesIndices = [];


        arr.forEach((current, index) => {

            if (duplicatesIndices.includes(index)) return;

            result.push(current);


            for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

                const comparison = arr[comparisonIndex];
                const currentKeys = Object.keys(current);
                const comparisonKeys = Object.keys(comparison);


                if (currentKeys.length !== comparisonKeys.length) continue;


                const currentKeysString = currentKeys.sort().join("").toLowerCase();
                const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
                if (currentKeysString !== comparisonKeysString) continue;


                let valuesEqual = true;
                for (let i = 0; i < currentKeys.length; i++) {
                    const key = currentKeys[i];
                    if ( current[key] !== comparison[key] ) {
                        valuesEqual = false;
                        break;
                    }
                }
                if (valuesEqual) duplicatesIndices.push(comparisonIndex);

            }
        });
        return result;
    }

    const selectActiveCard = (selectedCard, position, isDefined) => {
        setSelectedActiveCard( selectedActiveCard && selectedActiveCard.length > 0 && selectedActiveCard.length < 2 ?
            [...selectedActiveCard ,{card: selectedCard, position: position, isDefined: isDefined}]
            :
        [{card: selectedCard, position: position, isDefined: isDefined}]
        )

    }

    const selectCard = (selectedCard, position) => {
        setSelectedCard({card: selectedCard, position: position})
    }



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
                        if(e.position === 1 ) {
                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} isDefined={e.isDefined}
                                                                      onClick={() => selectActiveCard(e.cardName, 1)}/></Col>
                        }

                    })}
                    {activeCards.map(e => {
                        if(e.position === 2) {
                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} isDefined={e.isDefined}
                                                                      onClick={() => selectActiveCard(e.cardName, 2, e.isDefined)}/></Col>
                        }

                    })}
                    {activeCards.map(e => {
                        if(e.position === 3) {
                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} isDefined={e.isDefined}
                                                                      onClick={() => selectActiveCard(e.cardName, 3, e.isDefined)}/></Col>
                        }

                    })}
                </SelectedPlayingCard>
                <SelectedPlayingCard className='mt-3 mb-5 justify-content-around'>


                    {activeCards.map(e => {
                        if(e.position === 4 ) {
                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} isDefined={e.isDefined}
                                                                      onClick={() => selectActiveCard(e.cardName, 4, e.isDefined)}/></Col>
                        }

                    })}

                    {activeCards.map(e => {
                        if(e.position === 5) {
                            return <Col key={e.cardName}><PlayingCard image={e.cardImage} isDefined={e.isDefined}
                                                                      onClick={() => selectActiveCard(e.cardName, 5, e.isDefined)}/></Col>
                        }

                    })}

                </SelectedPlayingCard>
                <Row>
                    <Col xs={11}>
                        <Row>
                            {allPlayingCards.map(e => {
                                return <Col key={e.cardName}><PlayingCard isDefined={true}  onClick={() => selectCard(e.cardName, null,)}
                                                                          image={e.cardImage}/></Col>
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