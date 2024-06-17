import React, { useContext } from 'react'
import glassApps from "../../assets/glassapp.png";
import { EditorScreenContext } from '../../context/EditorScreenContext';
import { FocusBarContext } from '../../context/FocusBarContext';
import { TitleBarContext } from '../../context/TitleBarContext';


function  FocusBarApps({icon,name,url}) {
  const EditorScreen = useContext(EditorScreenContext)
  const Fbc = useContext(FocusBarContext)
  const Tbc = useContext(TitleBarContext)
  function OnMyAppClick(){
    EditorScreen.AddToEditorScreen(name,url,icon)
    EditorScreen.ToggleWorkScreen(name)  
    Tbc.setTitleValue(name)
    Fbc.setScrollShiftValue("55px")
  }

    return (
      <div id="focus-bar-apps" style={{ backgroundImage: `url(${glassApps})` }} onClick={()=>{OnMyAppClick()}}>
        <img src={icon} />
      </div>
    );
  }

export default FocusBarApps