import React, { useContext } from "react";
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




const FocusBar = () => {

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
        <FocusBarApps icon={gmeet} />
        <FocusBarApps icon={chatgpt} />
        <FocusBarApps icon={figma} />
        <FocusBarApps icon={youtube} />
        <FocusBarApps icon={spotify} />
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
