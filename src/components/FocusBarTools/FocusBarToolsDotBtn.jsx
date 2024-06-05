import React, {  useContext } from 'react'

import DotIcon from "../../assets/icons/DotIcon.png"

import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'


function FocusBarToolsDotBtn() {
  const Ewdc = useContext(EditorWorkSpaceDisplayContext)

  return (
    <div id="focus-bar-tools" onClick={()=>{Ewdc.ToggleWorkSpace("main")}}><img src={DotIcon}/></div>
  )
}

export default FocusBarToolsDotBtn