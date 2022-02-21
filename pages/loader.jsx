import {Row, Col, Container, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import {useRouter} from "next/router";
import background from "../public/background.png"
import styled from "styled-components";


const StyledSpinner = styled(Spinner)`
    position: absolute;
    top:50%;
    left:50%;   
`

const Background = styled.div`
    
`

export default function Loader() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/found-player');
        }, 2000);
    }, [])

    return <Container>
        <Row>
            <Col className="" xs={1}>
                <Background><img src={background}/></Background>
                <StyledSpinner   animation="border" variant="primary" />
            </Col>
        </Row>
    </Container>
}