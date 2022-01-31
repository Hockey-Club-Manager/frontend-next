import {Button} from "react-bootstrap";
import Settings from "../components/settings";
import {useState} from "react";


export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
      <main>
        <Settings show={showSettings} setShow={setShowSettings} />
        <Button onClick={()=>setShowSettings(true)}>Settings</Button>
      </main>
  )
}
