import React, { useContext } from 'react'
import glassApps from "../../assets/glassapp.png";
import { EditorScreenContext } from '../../context/EditorScreenContext';


function  FocusBarApps({icon,name,url}) {
  const EditorScreen = useContext(EditorScreenContext)
  
  function OnMyAppClick(){
    EditorScreen.AddToEditorScreen(name,url,icon)
    EditorScreen.ToggleWorkScreen(name)  
  }

    return (
      <div id="focus-bar-apps" style={{ backgroundImage: `url(${glassApps})` }} onClick={()=>{OnMyAppClick()}}>
        <img src={icon} />
      </div>
    );
  }

export default FocusBarApps