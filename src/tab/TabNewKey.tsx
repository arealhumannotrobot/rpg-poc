import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.scss';
import pgp from 'openpgp';
import CompKeyInput from '../comp/CompKeyInput';
//==============react-bootstrap================//
import {
  Form,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap';
//==============IndexedDB======================//
import * as localforage from 'localforage';
import { KEY_MY_RPG_KEYS, TYPE_MY_RPG_KEYS } from '../model/TypeDefination';

const TabNewKey: React.FC = () => {
  const [pubVal, setPubVal] = useState("");
  const [pvtVal, setPvtVal] = useState("");

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [passconfirm, setPassconfirm] = useState("");

  const [keyThumbDiv, setKeyThumbDiv] = useState(<div></div>);
  const [keyThumb, setKeyThumb] = useState("");

  const generatePGP = async () => {
    setKeyThumbDiv(<div>{`Generating pgp keypairs...`}</div>);
    try {
      let pgpGenKey = await pgp.generateKey({ "curve": "curve25519", "userIds": [{ "name": alias, "email": email }], "passphrase": passphrase })
      setPubVal(pgpGenKey.publicKeyArmored);
      setPvtVal(pgpGenKey.privateKeyArmored);
      setKeyThumb(pgpGenKey.key.getFingerprint());
      setKeyThumbDiv(<div>{`fingerprint: ${pgpGenKey.key.getFingerprint()}`}</div>);

      let myRpgKeys = await localforage.getItem<TYPE_MY_RPG_KEYS>(KEY_MY_RPG_KEYS);
      console.log(myRpgKeys);
      localforage.setItem<TYPE_MY_RPG_KEYS>(
        KEY_MY_RPG_KEYS, 
        {
          ...(myRpgKeys||{}),
          [pgpGenKey.key.getFingerprint()]: {
            privateKey: pgpGenKey.privateKeyArmored,
            publicKey: pgpGenKey.publicKeyArmored,
            email: email,
            alias: alias,
          }
        }
      )

    } 
    catch (error) {
      setKeyThumbDiv(<div>{`${error.toString()}`}</div>)
    }

  }
  //===============================================================================//
  return (
    <Container>

      {/* Input data needed for key generation */}
      <Form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          if (passconfirm === passphrase) {
            generatePGP();
          }
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
                  onChange={(v: React.ChangeEvent<HTMLInputElement>) => { setAlias(v.target.value) }}
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
                  onChange={(v: React.ChangeEvent<HTMLInputElement>) => { setEmail(v.target.value) }}
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
                onChange={(v: React.ChangeEvent<HTMLInputElement>) => { setPassphrase(v.target.value) }}
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
                isInvalid={passconfirm!==passphrase?true:undefined}
                isValid={passconfirm===passphrase}
                onChange={(v: React.ChangeEvent<HTMLInputElement>) => { setPassconfirm(v.target.value) }}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Button type="submit">{`Generate`}</Button>
      </Form>

      {/* Key pairs output (for manual ASCII armor) */}
      <div>{keyThumbDiv}</div>
      <Row>
        <Col lg={6} sm={12} xs={12}>
          <CompKeyInput
            label={"public key"}
            name={"newkey_public_key"}
            id={"newkey_public_key"}
            value={pubVal}
            readOnly
            copyBtn
          />
        </Col>
        <Col>
          <CompKeyInput
            label={"private key"}
            name={"newkey_private_key"}
            id={"newkey_private_key"}
            value={pvtVal}
            readOnly
            copyBtn
          />
        </Col>
      </Row>
    </Container>
  );
}

export default TabNewKey;

