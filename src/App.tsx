import React, { useState } from 'react';
import './App.scss';
//=============React Bootstrap==================//
import {Nav, Container, Navbar} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
//==============React Redux=========//
import {connect} from 'react-redux';
import { INIT_STATE_TYPE } from './redux/initState';
import { actcreate_tab_setTab } from './redux/reduce_tab';
//============== Tab ============//
import TabMyKeys from './tab/TabMyKeys';
import TabNewKey from './tab/TabNewKey';

const GITTHUB_PAGE = `https://github.com/arealhumannotrobot/rpg-poc`;

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
      Tab = TabNewKey;
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
      <Container>
        <Navbar
          fixed="top"
          variant="dark"
          bg="dark"
          expand="lg"
        >
          <Navbar.Brand>RPG-POC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav 
              className="mr-auto"
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
          </Navbar.Collapse>
          <a href={GITTHUB_PAGE} target="_blank" rel="noopener noreferrer">
            <div className="mr-sm-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#ccc"/>
              </svg>
            </div>
          </a>
        </Navbar>
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

