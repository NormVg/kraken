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
  

  function mymousescroll(event){
    if (event.deltaY < 0)
    {
    //  alert('scrolling up');
     SetFeState(true)
     SetFeToggleStyle({
      fe:"15px",
      tool:"12px",
      febg:"white",
      toolbg:"grey"
    })
    }
    else if (event.deltaY > 0)
    {
    //  alert('scrolling down');
     SetFeState(false)
     SetFeToggleStyle({
      fe:"12px",
      tool:"15px",
      toolbg:"white",
      febg:"grey"
    })
    }
    
   }

  
  return (
    <div id='editor-side-bar' style={{width:Estc.EstValue.sidebar.mywidth}}>
      {FeState ? <FileExplorer/> : <></>}
      <div id='footer-toggle-bar' onWheel={(e)=>{mymousescroll(e)}}>
        <div id='footer-bar-fe' style={{height:FeToggleStyle.fe, backgroundColor:FeToggleStyle.febg}} onClick={()=> {SetFeState(true)}} ></div>
        <div id='footer-bar-tool' style={{height:FeToggleStyle.tool, backgroundColor:FeToggleStyle.toolbg}}  onClick={()=> {SetFeState(false)}} ></div>
      </div>
    </div>
  )
}

export default SideBar