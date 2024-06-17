import React, { useContext } from 'react'

import terminal from "../../assets/icons/terminal.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'
import { EditorScreenContext } from '../../context/EditorScreenContext'
import { TitleBarContext } from '../../context/TitleBarContext'


function FocusBarToolsTerminal() {
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)
  const Tbc = useContext(TitleBarContext)
  const EditorScreen = useContext(EditorScreenContext)

  function toggleTerminal(){
    EditorScreen.ToggleWorkScreen("term")
    Tbc.setTitleValue("terminal")
  }

  return (
    <div id="focus-bar-tools" onClick={toggleTerminal}><img src={terminal}/></div>
  )
}

export default FocusBarToolsTerminal