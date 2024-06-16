import React, { useContext } from 'react'
import Folder from "../../assets/icons/folder.png"
import { EditorSidebarToggleContext } from '../../context/EditorContext';
import { SideBarContext } from '../../context/SideBarContext';

function FocusBarToolsFolder() {

  const Estc = useContext(EditorSidebarToggleContext);
  const Sbc = useContext(SideBarContext)
  function Toggle_sidebar(){
    Estc.EstToggle()
    Sbc.switchFe()
    
  }
  return (
    <div id="focus-bar-tools" onClick={()=>{Toggle_sidebar()}}><img src={Folder}/></div>
  )
}

export default FocusBarToolsFolder