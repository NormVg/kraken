import React, { useContext } from 'react'

import terminal from "../../assets/icons/terminal.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'


function FocusBarToolsTerminal() {
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)
  return (
    <div id="focus-bar-tools" onClick={()=>{Ewdc.ToggleWorkSpace("term")}}><img src={terminal}/></div>
  )
}

export default FocusBarToolsTerminal