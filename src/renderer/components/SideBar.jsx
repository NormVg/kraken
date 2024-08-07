import React ,{ useContext, useState } from 'react'
import  '../css/SideBarStyle.css'
import {EditorSidebarToggleContext} from "../context/EditorContext"
import FileExplorer from './FileExplorer'
import { SideBarContext } from '../context/SideBarContext'


function SideBar() {
  
  const Estc = useContext(EditorSidebarToggleContext)
  const Sbc = useContext(SideBarContext)

  function mymousescroll(event){
    if (event.deltaY < 0)    {
    //  alert('scrolling up');
      Sbc.switchFe()
    }
    else if (event.deltaY > 0)    {
    //  alert('scrolling down');
    Sbc.switchTool()
    }
    
   }

  
  return (
    <div id='editor-side-bar' style={{width:Estc.EstValue.sidebar.mywidth}}>
      {Sbc.FeState ? <FileExplorer/> : <></>}
      <div id='footer-toggle-bar' onWheel={(e)=>{mymousescroll(e)}}>
        <div id='footer-bar-fe' style={{height:Sbc.FeToggleStyle.fe, backgroundColor:Sbc.FeToggleStyle.febg}} onClick={Sbc.switchFe} ></div>
        <div id='footer-bar-tool' style={{height:Sbc.FeToggleStyle.tool, backgroundColor:Sbc.FeToggleStyle.toolbg}}  onClick={Sbc.switchTool} ></div>
      </div>
    </div>
  )
}

export default SideBar