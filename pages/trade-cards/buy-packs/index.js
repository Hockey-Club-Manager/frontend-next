import TradeCardsLayout from "../../../components/TradeCardsLayout";
import {Col, Row} from "react-bootstrap";
import NFTCard from "../../../components/NFTCard";

export default function BuyPacks(ctx) {
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
                    stats={[19,88,47,61,35]}
                    detailsLink="/trade-cards/buy-packs/1"
                />
                <Row className='justify-content-center mt-2'>
                    <Col className='col-auto'>
                      <span><a
                          href="https://paras.id/let45fc.near/collectibles"
                          className='text-decoration-none'
                          target='_blank'
                          rel="noreferrer"
                      >uriy-stolb.near</a> - 6,9 Ⓝ</span>
                    </Col>
                </Row>
            </Col>
        </Row>
    </TradeCardsLayout>
}
