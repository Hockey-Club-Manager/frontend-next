import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHockeyPuck} from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Container} from "react-bootstrap";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Loader() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/found-player');
        }, 2000);
    }, [])

    return <Container>
        <Row>
            <Col xs={1}>
                <FontAwesomeIcon icon={faHockeyPuck} spin className='fa-spin d-block' />
            </Col>
        </Row>
    </Container>
}