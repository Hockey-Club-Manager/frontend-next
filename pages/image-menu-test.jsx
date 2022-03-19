import styled from "styled-components";
import React, {Component} from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {Button} from "react-bootstrap";

const DraggableImg = styled.div`
    background: url("/menu-image.png") no-repeat center center fixed;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;  
`;

const MenuButton = styled(Button)`
    position: relative;
    top: 190px;
    left: 150px;
    width: 200px;
    background: linear-gradient(177.07deg, #0C2FAD -41.5%, #7391FF 97.56%);
    border: 6px solid #415FCA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin: 0;
    padding: 10px;
    font-family: 'Orbitron';
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 44px;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`


let doubleClick = {
    disabled: true
}

class ImageMenu extends Component {
    render() {
        return (
            <TransformWrapper centerOnInit={true} initialScale={1.6} doubleClick={doubleClick}>
                <TransformComponent>
                    <DraggableImg>
                        <MenuButton>TRADE CARDS</MenuButton>
                        <MenuButton style={{left: "1150px", top: "390px"}}>MANAGE TEAM</MenuButton>
                        <MenuButton style={{left: "400px", top: "350px"}}>PLAY GAME</MenuButton>
                    </DraggableImg>
                </TransformComponent>
            </TransformWrapper>
        );
    }
}
export default ImageMenu


