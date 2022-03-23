import styled from "styled-components";
import React, {Component} from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {Button, Container} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {faHockeyPuck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const DraggableImg = styled.div`
    background: url("/menu-image.png") no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;  
`;



const MenuButton = styled(Button)`
    position: fixed;
    display: flex;
    left: 10%;
    top: 40%;
    background-color: #ffff;
    max-width: 100px;
   
    background: linear-gradient(177.07deg, #0C2FAD -41.5%, #7391FF 97.56%);
    border: 6px solid #415FCA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin: 0;
    padding: 10px;
    font-weight: 600;
    font-size: calc(1rem + 1.24wv);
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`


const MenuNav = styled(Button)`
    display: flex;
    background: #415FCA;
    font-family: 'Orbitron';
    font-style: normal;
    max-width: 250px;
    font-weight: 500;
    font-size: calc(1rem + 2.24wv);
    line-height: 34px;
    text-align: center;
    color: #ffff;
    border-radius: 0px 0px 26px 0px;

`


let wheel = {
    step: 0.1
}

let pinch = {
    step: 1
}

let alignmentAnimation = {
    sizeX: 1,
    sizeY: 1,
    animationTime: 100,
    velocityAlignmentTime: 100,
}

class ImageMenu extends Component {
    render() {
        return (

            <TransformWrapper alignmentAnimation={alignmentAnimation} centerOnInit={true}
                              pinch={pinch} wheel={wheel} initialScale={1.6}>

                <TransformComponent>
                    <DraggableImg>
                            <MenuNav style={{position: "fixed", right: "0", borderRadius: "0px 0px 0px 26px"}}>
                                <span style={{padding: "10px"}}>Settings</span>
                                <FontAwesomeIcon style={{height: "50px", color: "#FFF"}} icon={faCog}/>
                            </MenuNav>
                            <MenuNav>
                                <span style={{padding: "10px"}}>About project</span>
                                <FontAwesomeIcon style={{height: "50px", color: "#FFF"}} icon={faHockeyPuck}/>
                            </MenuNav>
                            <Link href="/trade-cards/buy-cards"><MenuButton>TRADE CARDS</MenuButton></Link>
                            <Link href="/manage-team/set-lineups"><MenuButton style={{left: "70%"}}>MANAGE
                                TEAM</MenuButton></Link>
                            <Link href="/game"><MenuButton style={{left: "40%"}}>PLAY GAME</MenuButton></Link>
                    </DraggableImg>
                </TransformComponent>
            </TransformWrapper>

        );
    }
}


export default ImageMenu


