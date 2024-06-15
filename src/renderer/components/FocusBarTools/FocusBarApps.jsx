import React from 'react'
import glassApps from "../../assets/glassapp.png";


function  FocusBarApps(props) {
  
    return (
      <div id="focus-bar-apps" style={{ backgroundImage: `url(${glassApps})` }} onClick={()=>{}}>
        <img src={props.icon} />
      </div>
    );
  }

export default FocusBarApps