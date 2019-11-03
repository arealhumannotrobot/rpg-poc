import React, { useState } from 'react';
import './App.scss';
//=============React Bootstrap==================//
import {Nav, Container} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
//==============React Redux=========//
import {connect} from 'react-redux';
import { INIT_STATE_TYPE } from './redux/initState';
import { actcreate_tab_setTab } from './redux/reduce_tab';

type AppProps = {
  reduxState:INIT_STATE_TYPE,
  actcreate_tab_setTab: typeof actcreate_tab_setTab,
}
const App: React.FC<AppProps> = (props) => {

  type RpgTabContentProps = {
    reduxState:INIT_STATE_TYPE,
  }
  const RpgTabContent:React.FC<RpgTabContentProps> = (props) => {
    return (
      <div>
        <p>{props.reduxState.tab}</p>
      </div>
    )
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
          activeKey="MY_KEYS" 
          onSelect={ (k:any) => {console.log(`selected ${k}`); props.actcreate_tab_setTab(k)}}
        >
          <NavLink eventKey="MY_KEYS">MY_KEYS</NavLink>
          <NavLink eventKey="NEW_KEYS">NEW_KEYS</NavLink>
          <NavLink eventKey="KEY_SIGNING">KEY_SIGNING</NavLink>
          <NavLink eventKey="EXCH_KEY_RING">EXCH_KEY_RING</NavLink>
          <NavLink eventKey="VERF_STRANGER">VERF_STRANGER</NavLink>
          <NavLink eventKey="MSG_CRYPT">MSG_CRYPT</NavLink>
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

