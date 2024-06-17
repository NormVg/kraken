import React, {  useContext } from 'react'

import DotIcon from "../../assets/icons/DotIcon.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'
import { EditorScreenContext } from '../../context/EditorScreenContext'


function FocusBarToolsDotBtn() {
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)
  const EditorScreen = useContext(EditorScreenContext)
  return (
    <div id="focus-bar-tools" onClick={()=>{alert("you clicked the Dot btn")}}><img src={DotIcon}/></div>
  )
}

export default FocusBarToolsDotBtn