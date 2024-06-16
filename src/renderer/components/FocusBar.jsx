import React, { useContext, useState } from "react";
import "../css/FocusBarStyle.css";

import gmeet from "../assets/icons/gmeet.png";
import chatgpt from "../assets/icons/chatgpt.png";
import figma from "../assets/icons/figma.png";
import spotify from "../assets/icons/spotify.png";
import youtube from "../assets/icons/youtube.png";



import FocusBarToolsSideBar from "./FocusBarTools/FocusBarToolsSideBar";
import FocusBarToolsTerminal from "./FocusBarTools/FocusBarToolsTerminal";
import FocusBarToolsFolder from "./FocusBarTools/FocusBarToolsFolder";
import FocusBarToolsDotBtn from "./FocusBarTools/FocusBarToolsDotBtn";
import FocusBarScroolShift from "./FocusBarTools/FocusBarScroolShift";
import FocusBarApps from "./FocusBarTools/FocusBarApps";
import FocusBarTab from "./FocusBarTools/FocusBarTab";


import {EditorSidebarToggleContext} from "../context/EditorContext"
const { ipcRenderer } = window.require('electron');




const FocusBar = () => {

  const [WebAppDb,SetWebAppDb] = useState(null)
  

  if (WebAppDb == null){
    ipcRenderer.send("webapplist-read-0","true")

  }
    
  ipcRenderer.on("webapplist-read-1",(e,r)=>{
    console.log("gg",r)
    if (WebAppDb !=  r ){
      const MyGG = r.map((myList) =>  
    
    
        <FocusBarApps name={myList.name} url={myList.url}  icon={require( "../data/AppIcon/" +myList.icon)} />
      );  
      SetWebAppDb(MyGG)
    }
  })


  

  const Estc = useContext(EditorSidebarToggleContext)
  
  return (
    <div id="focus-bar" style={{width:Estc.EstValue.focusbar.mywidth,marginRight:Estc.EstValue.focusbar.marginright}}>
      
      <div id="focus-win-scroll-switch">
        <FocusBarScroolShift />
      </div>

      <div id="focus-tabs">
        <FocusBarTab />
        <FocusBarTab />
        <FocusBarTab />
        <FocusBarTab />
        <FocusBarTab />
        <FocusBarTab />
      </div>

      <div id="focus-apps">
        {
          WebAppDb
        }

      </div>

      <div id="focus-tools">
        <FocusBarToolsDotBtn/>
        <FocusBarToolsTerminal/>
        <FocusBarToolsFolder/>
        <FocusBarToolsSideBar/>
      </div>

    </div>
  );
};

export default FocusBar;
