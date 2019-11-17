import React from 'react';
//============= react bootstrap ============//
import Form from 'react-bootstrap/Form';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

type CopyBtnProp = {
  text?:string,
  customMsg?:string,
  customButton?: typeof Button,
}
const CompCopyBtn: React.FC<CopyBtnProp> = (props) => {
  const copyToClipboard = (text?:string) => {
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
    <OverlayTrigger
      key={'trigger-tooltip-alias'}
      placement={'bottom'}
      trigger={'focus'}
      overlay={
        <Tooltip id={`newkey-tooltip-alias`}>
          {props.customMsg?props.customMsg:`copied!`}
        </Tooltip>
      }
      delay={{ show: 200, hide: 2000 }}
    >
      {
        props.customButton?
        <props.customButton/>
        :
        <Button 
          type="button"
          className="btn btn-default btn-copy js-tooltip js-copy" 
          style={{backgroundColor:"white", borderColor:"black"}}
          onClick={()=>{copyToClipboard(props.text)}}
        >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg> 
        </Button>
      }
    </OverlayTrigger>
  );
}

export default CompCopyBtn;