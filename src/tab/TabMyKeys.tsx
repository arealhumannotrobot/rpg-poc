import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.scss';
import pgp from 'openpgp';
import QrReader from 'react-qr-reader';
//=====================================//

import CompKeyInput from '../comp/CompKeyInput';
import { Jumbotron } from 'react-bootstrap';

let refPub, refPvt, refMsg

const TabMyKeys: React.FC = () => {
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
    <div className="container">
      <Jumbotron>
        <div>{`Under construction: See NEW_KEYS`}</div>
      </Jumbotron>
      {/* <header className="App-header">
      </header> */}
      <CompKeyInput
        label={"public key"}
        name={"public_key"}
        id={"public_key"}
        value={pubVal}
      />
      <CompKeyInput
        label={"private key"}
        name={"private_key"}
        id={"private_key"}
        value={pvtVal}
      />
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

export default TabMyKeys;

