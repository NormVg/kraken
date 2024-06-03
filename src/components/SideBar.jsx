import React ,{ useContext } from 'react'
import  '../css/SideBarStyle.css'
import {EditorSidebarToggleContext} from "../context/EditorContext"


function SideBar() {
  const Estc = useContext(EditorSidebarToggleContext)
  return (
    <div id='editor-side-bar' style={{width:Estc.EstValue.sidebar.mywidth}}></div>
  )
}

export default SideBar