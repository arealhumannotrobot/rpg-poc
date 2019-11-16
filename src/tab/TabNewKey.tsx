import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.scss';
import pgp from 'openpgp';
import QrReader from 'react-qr-reader';
//=====================================//

import CompKeyInput from '../comp/CompKeyInput';
import { Form, Container, Row, Col, OverlayTrigger, Tooltip, Button, FormControlProps } from 'react-bootstrap';

let refPub, refPvt, refMsg

const TabNewKey: React.FC = () => {
  const [pubVal, setPubVal] = useState("");
  const [pvtVal, setPvtVal] = useState("");

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [passconfirm, setPassconfirm] = useState("");


  const [keyThumb, setKeyThumb] = useState(<div></div>);

  // const [showQRScan, setShowQRScan] = useState(true);
  const [showQRScan, setShowQRScan] = useState(false);
  const [qrCode, setQrCode] = useState("");

  return (
    <div className="container">
      <Container>

        {/* Input data needed for key generation */}
        <Form
          onSubmit={(e:React.FormEvent)=>{e.preventDefault(); console.log(`submit`); }}
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
                    <Tooltip id={`tooltip-alias`}>
                      <strong>Do not</strong> use real name or any identifiable nick-name for this application.
                      Use a pseudonym or alias instead.
                    </Tooltip>
                  }
                >
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Alias" 
                    required 
                    // onChange={(v)=>{setAlias(v.target.value)}}
                    onChange={(v:React.ChangeEvent<HTMLInputElement>)=>{console.log(v.target.value)}}
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
                    <Tooltip id={`tooltip-email`}>
                      <strong>Do not</strong> use your personal email address. In fact, it doesn't even have to be an actual address.
                    </Tooltip>
                  }
                >
                  <Form.Control type="email" placeholder="Enter email" required/>
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
                <Form.Control type="password" placeholder="Enter Passphrase" required/>
              </Form.Group>
            </Col>
            {/* Input Passphrase */}
            <Col>
              <Form.Group>
                <Form.Label>Confirm Passphrase</Form.Label>
                <Form.Control type="password" placeholder="Confirm Passphrase" required/>
              </Form.Group>
            </Col>
          </Form.Row>
          <Button type="submit">{`Generate`}</Button>
        </Form>


        <Row>
          <Col lg={6} sm={12} xs={12}>
            <CompKeyInput
              label={"public key"}
              name={"public_key"}
              id={"public_key"}
              value={pubVal}
            />
          </Col>
          <Col>
            <CompKeyInput
              label={"private key"}
              name={"private_key"}
              id={"private_key"}
              value={pvtVal}
            />
          </Col>
        </Row>
      </Container>
      <div>
        <label htmlFor="alias">Alias</label>
        <input type="text" name="alias" id="alias" onChange={(v)=>{setAlias(v.target.value)}}/>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={(v)=>{setEmail(v.target.value)}}/>
        <label htmlFor="passphrase">Passphrase</label>
        <input type="password" name="passphrase" id="passphrase" onChange={(v)=>{setPassphrase(v.target.value)}}/>
        <label htmlFor="passconfirm">Confirm Passphrase</label>
        <input type="password" name="passconfirm" id="passconfirm" onChange={(v)=>{setPassconfirm(v.target.value)}}/>
      </div>
      <div>
        <input type="button" value="Generate" onClick={()=>{
          let errFlag=false;
          let listOfErr:JSX.Element[]=[];
          if (!alias) {
            listOfErr.push(<p key={`err-alias`} style={{color:"red"}}>{`Missing Alias for key pair`}</p>)
            errFlag=true;
          }
          if (!email) {
            listOfErr.push(<p key={`err-email`} style={{color:"red"}}>{`Missing Email for key pair`}</p>)
            errFlag=true;
          }
          if (!passphrase) {
            listOfErr.push(<p key={`err-passphrase`} style={{color:"red"}}>{`Missing passphrase for key pair`}</p>)
            errFlag=true;
          }
          if (passphrase!==passconfirm) {
            listOfErr.push(<p key={`err-passconfirm`} style={{color:"red"}}>{`Confirm passphrase mismatch`}</p>)
            errFlag=true;
          }
          if (!errFlag) {
            setKeyThumb(<div>{`Generating pgp keypairs...`}</div>);
            pgp.generateKey({"curve":"curve25519", "userIds":[{"name":alias, "email":email}], "passphrase":passphrase})
              .then(k => {
                setPubVal(k.publicKeyArmored);
                setPvtVal(k.privateKeyArmored);
  
                let finger = k.key.getFingerprint();
                console.log(`fingerprint: ${finger}`);
                setKeyThumb(<div>{`fingerprint: ${finger}`}</div>);
              })
              .catch(e=>console.log(e))
          }
          else {
            setKeyThumb(
              <div>
                {listOfErr}
              </div>
            )
          }
        }}/>
      </div>
      <div>{keyThumb}</div>

      <div>
        <CompKeyInput 
          name={`msg`}
          id={`msg`}
          label={`Message`}
        />
      </div>

      <input type="button" value="Toggle QR camera"
        onClick={()=>{
          setShowQRScan(!showQRScan);
        }}
      />

      {
        showQRScan?
        <div>
          <div>{qrCode}</div>
          <QrReader 
            onScan={(data)=>{console.log(data); if (data) setQrCode(data); }}
            onError={(err)=>console.log(err)}
            style={{width:400, height:400}}
          />
        </div>
        :
        null
      }

    </div>
  );
}

export default TabNewKey;

