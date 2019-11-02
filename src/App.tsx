import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import pgp from 'openpgp';
import QrReader from 'react-qr-reader';
// import {} from ''
//=====================================//
import {Nav, NavItem, Container} from 'react-bootstrap';
import CompKeyInput from './comp/CompKeyInput';
import NavLink from 'react-bootstrap/NavLink';

let refPub, refPvt, refMsg

const App: React.FC = () => {
  const [pubVal, setPubVal] = useState("");
  const [pvtVal, setPvtVal] = useState("");
  const [msgVal, setMsgVal] = useState("");

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [passconfirm, setPassconfirm] = useState("");


  const [keyThumb, setKeyThumb] = useState(<div></div>);

  // const [showQRScan, setShowQRScan] = useState(true);
  const [showQRScan, setShowQRScan] = useState(false);
  const [qrCode, setQrCode] = useState("");

  return (


    <div className="App">
      <Container>
        <Nav>
          <NavLink>Hello</NavLink>
          <NavLink>Hello</NavLink>
          <NavLink>Hello</NavLink>
          <NavLink>Hello</NavLink>
          <NavLink>Hello</NavLink>
        </Nav>
      </Container>

    </div>
  );
}

export default App;

