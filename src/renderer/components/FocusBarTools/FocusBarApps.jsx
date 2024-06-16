import React, { useContext } from 'react'
import glassApps from "../../assets/glassapp.png";
import { EditorScreenContext } from '../../context/EditorScreenContext';
import { FocusBarContext } from '../../context/FocusBarContext';


function  FocusBarApps({icon,name,url}) {
  const EditorScreen = useContext(EditorScreenContext)
  const Fbc = useContext(FocusBarContext)

  function OnMyAppClick(){
    EditorScreen.AddToEditorScreen(name,url,icon)
    EditorScreen.ToggleWorkScreen(name)  
    const a = EditorScreen.calcScrollShiftvalue()
    Fbc.setScrollShiftValue(a)
  }

    return (
      <div id="focus-bar-apps" style={{ backgroundImage: `url(${glassApps})` }} onClick={()=>{OnMyAppClick()}}>
        <img src={icon} />
      </div>
    );
  }

export default FocusBarApps