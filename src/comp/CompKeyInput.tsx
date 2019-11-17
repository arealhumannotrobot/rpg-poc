import React from 'react';
//============= react bootstrap ============//
import Form from 'react-bootstrap/Form';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import CompCopyBtn from './CompCopyBtn';

type KeyInputProp = {
  name:string,
  id:string,
  label:string,
  value?:string,
  disabled?:boolean,
  readOnly?:boolean,
  copyBtn?:boolean,
}
const CompKeyInput: React.FC<KeyInputProp> = (props) => {
  const copyToClipboard = (text:string|undefined) => {
    if (!text) return;
    let copyTest = document.queryCommandSupported('copy');
  
    if (copyTest === true) {
      let copyTextArea = document.createElement("textarea");
      // copyTextArea.hidden = true;
      copyTextArea.value = text;
      document.body.appendChild(copyTextArea);
      copyTextArea.select();
      try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'Copied!' : 'Whoops, not copied!';
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      document.body.removeChild(copyTextArea);
    } else {
      // Fallback if browser doesn't support .execCommand('copy')
      window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
  }

  //=======================================================//
  return (
    <Form.Group controlId="props.id">
      {
        props.copyBtn?
        (
          <CompCopyBtn
            text={props.value}
          />
        ):
        null
      }
      
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        readOnly={props.readOnly}
        disabled={props.disabled}
        name={props.name}
        value={props.value}
        as="textarea" 
        rows="10" 
      />
    </Form.Group>
    // <div className="KeyInput">
    //   <label htmlFor={props.id}>{props.label}</label>
    //   <textarea rows={10} name={props.name} id={props.id} value={props.value} onChange={(s)=>{console.log(s)}}/>
    // </div>
  );
}

export default CompKeyInput;