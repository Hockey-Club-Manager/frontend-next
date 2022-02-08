import TradeCardsLayout from "../../../components/TradeCardsLayout";
import {Col, Row} from "react-bootstrap";
import NFTCard from "../../../components/NFTCard";

export default function FreeAgents(ctx) {
    return <TradeCardsLayout>
        <Row className='mx-4 my-4 gx-4 gy-4'>
            <Col className='col-4'>
                <NFTCard
                    imgURL='/nft.png'
                    year={2022}
                    position='LW'
                    name='Player #12'
                    number={99}
                    role='Best player ever'
                    stats={[49,88,77,61,55]}
                    detailsLink="/trade-cards/free-agents/1"
                />
                <Row className='justify-content-center mt-2'>
                    <Col className='col-auto'>
                      <span><a
                          href="https://paras.id/let45fc.near/collectibles"
                          className='text-decoration-none'
                          target='_blank'
                          rel="noreferrer"
                      >alena.near</a> - 0,2 Ⓝ</span>
                    </Col>
                </Row>
            </Col>
        </Row>
    </TradeCardsLayout>
}
