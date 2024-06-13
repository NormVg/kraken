import React ,{ useContext, useState } from 'react'
import  '../css/SideBarStyle.css'
import {EditorSidebarToggleContext} from "../context/EditorContext"
import FileExplorer from './FileExplorer'


function SideBar() {
  
  const Estc = useContext(EditorSidebarToggleContext)
  const [FeToggleStyle,SetFeToggleStyle] = useState({
    fe:"15px",
    tool:"13px",
  })
  const [FeState,SetFeState] = useState(true)
  
  function switchFe(){
    SetFeState(true)
    SetFeToggleStyle({
     fe:"15px",
     tool:"12px",
     febg:"white",
     toolbg:"grey"
   })
  }

  function switchTool(){
    SetFeState(false)
    SetFeToggleStyle({
     fe:"12px",
     tool:"15px",
     febg:"grey",
     toolbg:"white"
   })
  }
  function mymousescroll(event){
    if (event.deltaY < 0)    {
    //  alert('scrolling up');
      switchFe()
    }
    else if (event.deltaY > 0)    {
    //  alert('scrolling down');
     switchTool()
    }
    
   }

  
  return (
    <div id='editor-side-bar' style={{width:Estc.EstValue.sidebar.mywidth}}>
      {FeState ? <FileExplorer/> : <></>}
      <div id='footer-toggle-bar' onWheel={(e)=>{mymousescroll(e)}}>
        <div id='footer-bar-fe' style={{height:FeToggleStyle.fe, backgroundColor:FeToggleStyle.febg}} onClick={switchFe} ></div>
        <div id='footer-bar-tool' style={{height:FeToggleStyle.tool, backgroundColor:FeToggleStyle.toolbg}}  onClick={switchTool} ></div>
      </div>
    </div>
  )
}

export default SideBar