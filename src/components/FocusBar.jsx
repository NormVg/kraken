import React from "react";
import "../css/FocusBarStyle.css";
import glassApps from "../assets/glassapp.png";
import gmeet from "../assets/icons/gmeet.png";
import chatgpt from "../assets/icons/chatgpt.png";
import figma from "../assets/icons/figma.png";
import spotify from "../assets/icons/spotify.png";
import youtube from "../assets/icons/youtube.png";
import winSwitech from "../assets/winSwitch.png";

import Folder from "../assets/icons/folder.png"
import DotIcon from "../assets/icons/DotIcon.png"
import terminal from "../assets/icons/terminal.png"

function FocusBarScroolShift() {
  return (
    <div id="focus-bar-scroll-shift">
      <img src={winSwitech} alt="" />
    </div>
  );
}

function FocusBarTab() {
  return <div id="focus-bar-tab">FocusBar</div>;
}

function FocusBarApps(props) {
  return (
    <div id="focus-bar-apps" style={{ backgroundImage: `url(${glassApps})` }}>
      <img src={props.icon} />
    </div>
  );
}

function FocusBarToolsFolder() {
  return <div id="focus-bar-tools"><img src={Folder}/></div>;
}

function FocusBarToolsTerminal() {
  return <div id="focus-bar-tools"><img src={terminal}/></div>;
}

function FocusBarToolsDotBtn() {
  return <div id="focus-bar-tools"><img src={DotIcon}/></div>;
}


const FocusBar = () => {
  return (
    <div id="focus-bar">
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
      </div>
    </div>
  );
};

export default FocusBar;
