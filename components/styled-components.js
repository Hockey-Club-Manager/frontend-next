import styled from "styled-components";
import {Button} from "react-bootstrap";


export const CircleBtn = styled(Button)`
  height: 35px;
  width: 35px;
  border-radius: 35px;
  padding: 0;
  font-size: 24px;
  
  &.first {
    margin-top: 300px;
  }
`
export const PlayingCard = styled.div`
  background-color: wheat;
  height: 125px;
  width: 80px;
  border-radius: 10px;

  &.goalie {
    margin-top: 140px;
  }
  &.goalie-game {
    margin-top: 220px;
  }
  
  &.border {
    border: 1px solid black !important;
  }
  
  &.sm {
    height: 65px;
    width: 45px;
  }
  
  &.bottom-left {
    margin-left: 40px;
  }
  &.bottom-right {
    margin-right: 40px;
  }
`

export const AcceptButton = styled.button`
    width: 280px
    height: 70px;
  -webkit-border-radius: 60;
  -moz-border-radius: 60;
  border-radius: 60px;
  font-family: Venture13;
font-style: normal;
font-weight: normal;
font-size: 34px;
line-height: 32px;
text-align: center;
  color: #ffffff;
  font-size: 20px;
  background: #75D973;
  padding: 10px 20px 10px 20px;
  border: solid #ffffff 2px;
  text-decoration: none;
  width: 200px;
  


&:hover {
  background: #27701d;
  text-decoration: none;
  transition: 0.2s linear;  
  }
    `


export const CancelButton = styled.button`
  width: 200px;
  -webkit-border-radius: 60;
  -moz-border-radius: 60;
  border-radius: 60px;
  font-family: Venture13;
    font-size: 34px;
    font-style: normal;
font-weight: 400;
line-height: 32px;
letter-spacing: 0em;
text-align: center;

  color: #ffffff;
  font-size: 20px;
  background: #DF7979;
  padding: 10px 20px 10px 20px;
  border: solid #ffffff 3px;
  text-decoration: none;



&:hover {
  background: #991111;
  text-decoration: none;
  transition: 0.2s linear;  
  }`