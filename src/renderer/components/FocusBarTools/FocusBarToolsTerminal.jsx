import React, { useContext } from 'react'

import terminal from "../../assets/icons/terminal.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'
import { EditorScreenContext } from '../../context/EditorScreenContext'


function FocusBarToolsTerminal() {
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)

  const EditorScreen = useContext(EditorScreenContext)
  return (
    <div id="focus-bar-tools" onClick={()=>{EditorScreen.ToggleWorkScreen("term")}}><img src={terminal}/></div>
  )
}

export default FocusBarToolsTerminal