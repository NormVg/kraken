import { useContext } from "react"
import React  from 'react'

import EditorIcon from "../../assets/icons/editor.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'
import { EditorScreenContext } from '../../context/EditorScreenContext'
import { TitleBarContext } from "../../context/TitleBarContext"

function FocusBarHome() {
    const Ewdc = useContext(EditorWorkSpaceDisplayContext)
    const EditorScreen = useContext(EditorScreenContext)
    const Tbc = useContext(TitleBarContext)

    function toggleEditor(){
        EditorScreen.ToggleWorkScreen("main")
        Tbc.setTitleValue("Editor")
      }
  return (
    <div id="focus-bar-tools" onClick={toggleEditor}><img src={EditorIcon}/></div>
  )
}

export default FocusBarHome