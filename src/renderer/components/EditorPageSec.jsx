import React, { useContext, useEffect, useState } from 'react'
import MyEditor from './MyEditor'
import { json, useSearchParams } from 'react-router-dom'
import FocusBar from './FocusBar'
import SideBar from './SideBar'

import MyTerminal from './MyTerminal'
import { EditorWorkSpaceDisplayContext,EditorProjectPathContext, EditorSidebarToggleContext } from '../context/EditorContext'

import  '../css/EditorPageStyle.css'
import AppView from './AppView'
import { EditorScreenContext } from '../context/EditorScreenContext'



const EditorPageSec = () => {
  const Estc = useContext(EditorSidebarToggleContext)
  const EditorScreen = useContext(EditorScreenContext)
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)
  const Eppc = useContext(EditorProjectPathContext)

  const [prams,setPrams] = useSearchParams()
  const folderPath = prams.get("path")
    
    

  
    
    if (Eppc.EppValue !=  folderPath){
      Eppc.SetEppValue(folderPath)
    }
    

    const GG =  EditorScreen.WebAppScreenValue.map((myList) =>  

      <div id="term" style={{width:Estc.EstValue.term.mywidth}} className={ (EditorScreen.CurrentScreenValue == myList.name) ? Ewdc.Ewd.app.myclassOn : Ewdc.Ewd.app.myclassOff}>
          <AppView url={myList.url} name={myList.name} icon={myList.icon}/>
        </div>

  
    );  

    console.log(EditorScreen.CurrentScreenValue)
    
    
  return (
    <>
    
        <FocusBar />
        <div id='main' className={(EditorScreen.CurrentScreenValue == "main") ? Ewdc.Ewd.main.myclassOn : Ewdc.Ewd.main.myclassOff} >
          <MyEditor />
        </div>

        <div id="term" style={{width:Estc.EstValue.term.mywidth}} className={ (EditorScreen.CurrentScreenValue == "term") ? Ewdc.Ewd.term.myclassOn : Ewdc.Ewd.term.myclassOff}>
          <MyTerminal/>
        </div>

          <SideBar  />
    
        {
          GG
        }
    </>
  )
}

export default EditorPageSec