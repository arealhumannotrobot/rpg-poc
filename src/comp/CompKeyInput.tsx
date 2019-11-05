import React from 'react';
//============= react bootstrap ============//
import Form from 'react-bootstrap/Form';

type KeyInputProp = {
  name:string,
  id:string,
  label:string,
  value?:string,
  disabled?:boolean,
}
const KeyInput: React.FC<KeyInputProp> = (props) => {
  return (
    <Form.Group controlId="props.id">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
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

export default KeyInput;