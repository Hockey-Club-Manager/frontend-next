import Link from "next/link";
import {Button} from "react-bootstrap";
import Settings from "../components/settings";
import {useEffect, useState} from "react";
import BidModal from "../components/BidModal";
import {useRouter} from "next/router";
import SetTactics from "../components/SetTactics";
import * as nearAPI from "near-api-js";
import {getObjects} from "../utils/near";



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
            wallet.requestSignIn(
                "example-contract.testnet", // contract requesting access
                "Example App", // optional
            );
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
         <BidModal
           show={isShowBid}
           onHide={hideBid}
           onBtnClick={()=>router.push('/loader')}
           content={[
               <h3 key='main-bid'>Set your bid for a game</h3>,
           ]}
         />
          <SetTactics/>

          <Link href='/manage-team/set-lineups'><a className='btn btn-primary'>Set lineups</a></Link>
          <Link href='/image-menu-test'><a className='btn btn-primary'>Image menu</a></Link>
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
