import React, { useContext } from 'react'
import winSwitech from "../../assets/winSwitch.png";


import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'


function FocusBarScroolShift () {

  const Ewdc = useContext(EditorWorkSpaceDisplayContext)


  function mymousescroll(event){
    if (event.deltaY < 0)
    {
     console.log('scrolling up');
     Ewdc.ToggleWorkSpace("main")
     
    }
    else if (event.deltaY > 0)
    {
     console.log('scrolling down');
     Ewdc.ToggleWorkSpace("term")
    }
    
   }





  return (
    <div id="focus-bar-scroll-shift" onWheel={(e)=>{mymousescroll(e)}}>
      <img src={winSwitech} alt="" />
    </div>
  )
}

export default FocusBarScroolShift 