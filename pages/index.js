import Head from 'next/head'
import { useContext } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Row, Col, Button }  from 'react-bootstrap'
import SideBar from '../components/SideBar'
import Canvas from '../components/Canvas'
import styles from "../styles/Home.module.css";
import { store } from "../hooks/ComponentContext"

export default function Home() {
  const globalState = useContext(store);
  const handleSave = (e) => {
    console.log('Make an API call to save with following component:', globalState["state"])
  }
  const handleReset = (e) => {
    localStorage.clear()
    location.reload()
  }
  console.log(globalState);
  return (
    <div id="next">
      <Head>
        <title>UI Builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="dark" variant="dark" fluid>
        <Navbar.Brand href="#home">UI-Builder</Navbar.Brand>
        <Navbar.Collapse>
          <Nav.Item className="ml-auto">
            <Row>
              <Col><Button onClick={handleSave} disabled={Object.keys(globalState["state"]).length === 0 && globalState["state"].constructor === Object}>Save</Button></Col>
              <Col><Button onClick={handleReset} disabled={Object.keys(globalState["state"]).length === 0 && globalState["state"].constructor === Object}>Reset</Button></Col>
            </Row>
          </Nav.Item>
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.page}>
        <Row className={styles.row}>
          <Col md={2} className={styles.col}><SideBar /></Col>
          <Col md={10} className={styles.col}><Canvas /></Col>
        </Row>
      </div>
    </div>
  )
}
