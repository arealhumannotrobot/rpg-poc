import React from 'react';

type KeyInputProp = {
  name:string,
  id:string,
  label:string,
  value?:string,
}

const KeyInput: React.FC<KeyInputProp> = (props) => {
  return (
    <div className="KeyInput">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea rows={10} name={props.name} id={props.id} value={props.value} onChange={(s)=>{console.log(s)}}/>
    </div>
  );
}

export default KeyInput;