import 'bootstrap/dist/css/bootstrap.min.css';
import {SSRProvider} from "react-bootstrap";
import Layout from "../components/layout";
import styles from '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return <SSRProvider><Layout><Component {...pageProps} /></Layout></SSRProvider>
}

export default MyApp
