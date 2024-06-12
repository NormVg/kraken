import React, { useContext } from "react";
import sidebar from "../../assets/icons/sideba.png";
import { EditorSidebarToggleContext } from "../../context/EditorContext";
const { ipcRenderer } = window.require('electron');

function FocusBarToolsSideBar() {
  const Estc = useContext(EditorSidebarToggleContext);

  function Toggle_sidebar(){
    Estc.EstToggle()
    
    
  }

  return (
    <div id="focus-bar-tools" onClick={Toggle_sidebar}>
      <img src={sidebar} />
    </div>
  );
}

export default FocusBarToolsSideBar;
