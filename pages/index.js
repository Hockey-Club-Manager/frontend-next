import Link from "next/link";
import {Button} from "react-bootstrap";
import Settings from "../components/settings";
import {useState} from "react";
import BidModal from "../components/BidModal";
import {useRouter} from "next/router";
import SetTactics from "../components/SetTactics";



export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [isShowBid, setIsShowBid] = useState(false);

  const showBid = () => setIsShowBid(true);
  const hideBid = () => setIsShowBid(false);

  const router = useRouter();

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
      </main>
  )
}
