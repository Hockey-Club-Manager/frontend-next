import Link from "next/link";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import Settings from "../components/settings";
import {useEffect, useState} from "react";
import {SModal} from "../components/settings";
import {useRouter} from "next/router";
import SetTactics from "../components/SetTactics";
import * as nearAPI from "near-api-js";
import {gameContractName, getGameContract, getObjects} from "../utils/near";

function BidModal ({show, onHide}) {
    const [bid, setBid] = useState(0.01);
    let wallet, contract;
    const [availablePlayers, setAvailablePlayers] = useState();

    const updateAvailablePlayers = () => {
        contract.get_available_players({from_index: 0, limit: 50}).then(r => {
            console.log(r);
            setAvailablePlayers(r);
        });
    }

    useEffect(()=> {
        getObjects().then(r => {
            const {wallet: _wallet} = r;
            wallet = _wallet;
            contract = getGameContract(_wallet);
            // updateAvailablePlayers();
            console.log('got objects')
        });
    }, []);


    return <SModal show={show} onHide={onHide} centered>
        <Modal.Header closeButton />
        <Modal.Body>
            <h3 key='main-bid'>Set your bid for a game</h3>
            <Row className='mt-3 justify-content-center'>
                <Col className='col-auto'>
                    <Form.Group>
                        <div className="input-group input-group-lg" id="big-modal-input">
                            <input type="number" step='0.01' min='0.01' className='form-control' aria-labelledby="big-modal-input"
                                   value={bid} onChange={(event)=>setBid(event.target.value)} />
                            <span className="input-group-text">Ⓝ</span>
                        </div>
                    </Form.Group>
                </Col>
                <Col className='col-auto'>
                    <Button variant='success' onClick={()=>router.push('/loader')}>Offer</Button>
                </Col>
            </Row>
            <Row className='justify-content-start my-3'>
                <Col className='col-auto'>
                    <h4><b>or</b> choose opponent from the list</h4>
                </Col>
                <Col className='col-auto'>
                    <Button variant='outline-secondary' size='sm' onClick={()=>updateAvailablePlayers()}>update</Button>
                </Col>
            </Row>
            <Table striped hover bordered variant='warning'>
                <thead>
                <tr>
                    <th>Opponent</th>
                    <th>Bid</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>kastet99.near</td>
                    <td>4 Ⓝ</td>
                </tr>
                <tr>
                    <td>let45fc.near</td>
                    <td>2 Ⓝ</td>
                </tr>
                </tbody>
            </Table>
        </Modal.Body>
    </SModal>
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [isShowBid, setIsShowBid] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const showBid = () => setIsShowBid(true);
  const hideBid = () => setIsShowBid(false);

  const router = useRouter();
    const [balance, setBalance] = useState('');

    useEffect(()=> {
        getObjects().then(r => {
            const {near, wallet} = r;

            setIsSigned(wallet.isSignedIn());
            const walletAccountID = wallet.getAccountId();

            wallet.isSignedIn() && near.account(walletAccountID).then(account => {
                account.getAccountBalance().then(_balance => {
                    setBalance(nearAPI.utils.format.formatNearAmount(_balance.available).slice(0, -14));
                });
            })
        });
    }, []);

    const signIn = () => {
        getObjects().then(r => {
            const {wallet} = r;
            wallet.requestSignIn(gameContractName, "NFT Hockey");
        })
    };

    const signOut = () => {
        getObjects().then(r => {
            const {wallet} = r;
            wallet.signOut();
            setIsSigned(false);
        })
    };

  return (
      <main>
        <Settings show={showSettings} setShow={setShowSettings} />
        <Button onClick={()=>setShowSettings(true)}>Settings</Button>
         <Link href='/trade-cards/buy-cards'><Button>Trade cards</Button></Link>
         <Button onClick={showBid}>Play game</Button>
         <BidModal show={isShowBid} onHide={hideBid} />
          <SetTactics/>

          <Link href='/manage-team/set-lineups'><a className='btn btn-primary'>Set lineups</a></Link>
          <Link href='/image-menu-test'><a className='btn btn-primary'>Image menu</a></Link>
          <Link href='/contracts-test'><a className='btn btn-warning'><code>contracts test</code></a></Link>
          <br/>
          {isSigned ?
              <Button variant='dark' onClick={()=>signOut()}>Sign out</Button>
          :
              <Button variant='dark' onClick={()=>signIn()}>Sign in</Button>
          }
          {isSigned && <>
              <h3>{balance}</h3>
          </>}
      </main>
  )
}
