import React, { useContext } from "react";
import closebtn from "../assets/close.png"
import maxbtn from "../assets/max.png"
import minbtn from "../assets/mini.png"

import "../css/HeadStyle.css"
import { TitleBarContext } from "../context/TitleBarContext";
import MiddleBar from "./MiddleBar";
import { EditorScreenContext } from "../context/EditorScreenContext";

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

// function NameBar() {
//   return <div id="h-left">Kraken</div>;
// }

function WindowBar() {
  return (
    <div id="h-right">
      <button onClick={appCloseHandler}><img src={closebtn} /></button>
      <button onClick={appMaxHandler}><img src={maxbtn}  /></button>
      <button onClick={appMinHandler}><img src={minbtn}  /></button>
    </div>
  ); 
}



export default function HeaderBar() {
  const contextTitleBar = useContext(TitleBarContext)
 const contextCurrentScreen = useContext(EditorScreenContext)

 const CurrentScreen =  contextCurrentScreen.CurrentScreenValue

 function ToShowMiddleBar(){
  if (CurrentScreen == "main"){
    return false
  }else if (CurrentScreen == "term") {
    return false
  }else{
    return true
  }
 }

  return (

    <div id="header">
      <div id="h-left">{contextTitleBar.TitleValue}</div>

      {ToShowMiddleBar() ? <MiddleBar/> : <></> }
      
      <WindowBar/>
    </div>

  );
}
