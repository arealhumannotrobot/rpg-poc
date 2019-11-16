import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.scss';
import pgp from 'openpgp';
import QrReader from 'react-qr-reader';
//=====================================//

import CompKeyInput from '../comp/CompKeyInput';
import { 
  Form, 
  Container, 
  Row, 
  Col, 
  OverlayTrigger, 
  Tooltip, 
  Button,
} from 'react-bootstrap';

let refPub, refPvt, refMsg

const TabNewKey: React.FC = () => {
  const [pubVal, setPubVal] = useState("");
  const [pvtVal, setPvtVal] = useState("");

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [passconfirm, setPassconfirm] = useState("");

  const [keyThumb, setKeyThumb] = useState(<div></div>);

  const generatePGP = ()=>{
    setKeyThumb(<div>{`Generating pgp keypairs...`}</div>);
      pgp.generateKey({"curve":"curve25519", "userIds":[{"name":alias, "email":email}], "passphrase":passphrase})
        .then(k => {
          setPubVal(k.publicKeyArmored);
          setPvtVal(k.privateKeyArmored);

          let finger = k.key.getFingerprint();
          console.log(`fingerprint: ${finger}`);
          setKeyThumb(<div>{`fingerprint: ${finger}`}</div>);
        })
        .catch(e=>{
          setKeyThumb(<div>{`${e.toString()}`}</div>)
        })
  }
  //===============================================================================//
  return (
    <Container>
      
      {/* Input data needed for key generation */}
      <Form
        onSubmit={(e:React.FormEvent)=>{
          e.preventDefault(); 
          if (passconfirm===passphrase){
            generatePGP();
            return true;
          }
          else
            return false;
        }}
      >
        {/* Input Identity */}
        <Form.Row>
          {/* Input Alias */}
          <Col lg={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Alias</Form.Label>
              <OverlayTrigger
                key={'trigger-tooltip-alias'}
                placement={'bottom'}
                trigger={'focus'}
                overlay={
                  <Tooltip id={`newkey-tooltip-alias`}>
                    <strong>Do not</strong> use real name or any identifiable nick-name for this application.
                    Use a pseudonym or alias instead.
                  </Tooltip>
                }
              >
                <Form.Control 
                  type="text" 
                  placeholder="Enter Alias" 
                  required 
                  onChange={(v:React.ChangeEvent<HTMLInputElement>)=>{setAlias(v.target.value)}}
                />
              </OverlayTrigger>
            </Form.Group>
          </Col>
          {/* Input Email */}
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <OverlayTrigger
                key={'trigger-tooltip-email'}
                placement={'bottom'}
                trigger={'focus'}
                overlay={
                  <Tooltip id={`newkey-tooltip-email`}>
                    <strong>Do not</strong> use your personal email address. 
                    In fact, it doesn't even have to be an actual address.
                  </Tooltip>
                }
              >
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  required
                  onChange={(v:React.ChangeEvent<HTMLInputElement>)=>{setEmail(v.target.value)}}
                />
              </OverlayTrigger>
            </Form.Group>
          </Col>
        </Form.Row>
        {/* Input Passphrase */}
        <Form.Row>
          {/* Input Passphrase */}
          <Col lg={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Passphrase</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter Passphrase"
                required
                onChange={(v:React.ChangeEvent<HTMLInputElement>)=>{setPassphrase(v.target.value)}}
              />
            </Form.Group>
          </Col>
          {/* Confirm Passphrase */}
          <Col>
            <Form.Group>
              <Form.Label>Confirm Passphrase</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm Passphrase" 
                required
                isInvalid={passconfirm!==passphrase}
                isValid={passconfirm===passphrase}
                onChange={(v:React.ChangeEvent<HTMLInputElement>)=>{setPassconfirm(v.target.value)}}
                onInvalid={(e:any)=>{e.target.setCustomValidity("Passphrase mismatch!")}}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Button type="submit">{`Generate`}</Button>
      </Form>

      {/* Key pairs output (for manual ASCII armor) */}
      <div>{keyThumb}</div>
      <Row>
        <Col lg={6} sm={12} xs={12}>
          <CompKeyInput
            label={"public key"}
            name={"newkey_public_key"}
            id={"newkey_public_key"}
            value={pubVal}
            readOnly
          />
        </Col>
        <Col>
          <CompKeyInput
            label={"private key"}
            name={"newkey_private_key"}
            id={"newkey_private_key"}
            value={pvtVal}
            readOnly
          />
        </Col>
      </Row>
    </Container>
  );
}

export default TabNewKey;

