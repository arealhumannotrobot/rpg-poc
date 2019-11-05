import React, { useState } from 'react';
import './App.scss';
//=============React Bootstrap==================//
import {Nav, Container} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
//==============React Redux=========//
import {connect} from 'react-redux';
import { INIT_STATE_TYPE } from './redux/initState';
import { actcreate_tab_setTab } from './redux/reduce_tab';
//============== Tab ============//
import TabMyKeys from './tab/TabMyKeys';

type AppProps = {
  reduxState:INIT_STATE_TYPE,
  actcreate_tab_setTab: typeof actcreate_tab_setTab,
}
const App: React.FC<AppProps> = (props) => {

  type RpgTabContentProps = {
    reduxState:INIT_STATE_TYPE,
  }
  const RpgTabContent:React.FC<RpgTabContentProps> = (props) => {
    let Tab:typeof TabMyKeys = (childprops)=>(
      <div>
        {props.reduxState.tab}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
              Upload
            </span>
          </div>
          <div className="custom-file">
            <input
              //https://usefulangle.com/post/193/javascript-read-local-file
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              accept="text/plain"
              onChange={(e)=>{
                console.log(e.target.files);
                let reader = new FileReader();
                reader.addEventListener('load', (e)=>{
                  if (e.target)
                    console.log(e.target.result);
                })
                if (e.target.files && e.target.files.length){
                  reader.readAsText(e.target.files[0]);
                }
              }}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
        </div>
      </div>
    );
    if (props.reduxState.tab === "MY_KEYS"){
      Tab = TabMyKeys;
    }
    else if (props.reduxState.tab === "NEW_KEYS"){
    }
    else if (props.reduxState.tab === "KEY_SIGNING"){
      
    }
    else if (props.reduxState.tab === "EXCH_KEY_RING"){
      
    }
    else if (props.reduxState.tab === "VERF_STRANGER"){
      
    }
    else if (props.reduxState.tab === "MSG_CRYPT"){
      
    }

    return ( <Tab /> )
  }

  return (
    <div className="App">
      <p>
        Code for Proof of Concept: 
        <a href="https://github.com/arealhumannotrobot/rpg-poc">
          https://github.com/arealhumannotrobot/rpg-poc
        </a>
      </p>
      <Container>
        <Nav 
          variant="pills"
          activeKey={props.reduxState.tab} 
          onSelect={ (k:any) => {console.log(`selected ${k}`); props.actcreate_tab_setTab(k)}}
        >
          <Nav.Item>
            <NavLink eventKey="MY_KEYS">MY_KEYS</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey="NEW_KEYS">NEW_KEYS</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey="KEY_SIGNING">KEY_SIGNING</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey="EXCH_KEY_RING">EXCH_KEY_RING</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey="VERF_STRANGER">VERF_STRANGER</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey="MSG_CRYPT">MSG_CRYPT</NavLink>
          </Nav.Item>
        </Nav>
        <RpgTabContent
          reduxState={props.reduxState}
        />
      </Container>

    </div>
  );
}

const mapStateToProps = (state:INIT_STATE_TYPE) => ({ reduxState: state });
const mapDispatchToProps = {
  actcreate_tab_setTab
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

