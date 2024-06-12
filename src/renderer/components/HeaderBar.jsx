import React from "react";
import closebtn from "../assets/close.png"
import maxbtn from "../assets/max.png"
import minbtn from "../assets/mini.png"

import "../css/HeadStyle.css"

const { ipcRenderer } = window.require('electron');

function appCloseHandler(){
  ipcRenderer.send("app-close","gg")
}
function appMaxHandler(){
  ipcRenderer.send("app-max","gg")
}
function appMinHandler(){
  ipcRenderer.send("app-min","gg")
}

function NameBar() {
  return <div id="h-left">Kraken</div>;
}

function WindowBar() {
  return (
    <div id="h-right">
      <button onClick={appCloseHandler}><img src={closebtn} /></button>
      <button onClick={appMaxHandler}><img src={maxbtn}  /></button>
      <button onClick={appMinHandler}><img src={minbtn}  /></button>
    </div>
  ); 
}

function MiddleBar(){
  return
}

export default function HeaderBar() {
  return (

    <div id="header">
      <NameBar/>
      <WindowBar/>
    </div>

  );
}
