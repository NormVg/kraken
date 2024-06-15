import React, { useContext, useEffect, useState } from 'react'
import MyEditor from './MyEditor'
import { json, useSearchParams } from 'react-router-dom'
import FocusBar from './FocusBar'
import SideBar from './SideBar'

import MyTerminal from './MyTerminal'
import { EditorWorkSpaceDisplayContext,EditorProjectPathContext, EditorSidebarToggleContext } from '../context/EditorContext'

import  '../css/EditorPageStyle.css'
import AppView from './AppView'



const EditorPageSec = () => {
    const [prams,setPrams] = useSearchParams()
    const folderPath = prams.get("path")
    
    

    const Ewdc = useContext(EditorWorkSpaceDisplayContext)
    const Eppc = useContext(EditorProjectPathContext)
    
    if (Eppc.EppValue !=  folderPath){
      Eppc.SetEppValue(folderPath)
    }
    const Estc = useContext(EditorSidebarToggleContext)
    
  return (
    <>
    
        <FocusBar />
        <div id='main' className={Ewdc.Ewd.main.state ? Ewdc.Ewd.main.myclassOn : Ewdc.Ewd.main.myclassOff} >
          <MyEditor />
        </div>

        <div id="term" style={{width:Estc.EstValue.term.mywidth}} className={Ewdc.Ewd.term.state ? Ewdc.Ewd.term.myclassOn : Ewdc.Ewd.term.myclassOff}>
          <MyTerminal/>
        </div>

          <SideBar  />
    
    
    </>
  )
}

export default EditorPageSec