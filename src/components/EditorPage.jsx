import React, { useState } from 'react'
import MyEditor from './MyEditor'
import { useSearchParams } from 'react-router-dom'
import FocusBar from './FocusBar'
import SideBar from './SideBar'
import {EditorSidebarToggleProvider} from "../context/EditorContext"

const EditorPage = () => {
    const [prams,setPrams] = useSearchParams()
    const folderPath = prams.get("path")
    const [sidebarState,setSidebarState] = useState("close")
    const [sectionValue,SetsectionValue] = useState({})

  return (
    <>
    <EditorSidebarToggleProvider>
        <FocusBar />
        <MyEditor />
        <SideBar  />
    
    </EditorSidebarToggleProvider>
    </>
  )
}

export default EditorPage