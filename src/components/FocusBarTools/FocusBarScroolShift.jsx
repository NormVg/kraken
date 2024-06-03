import React from 'react'
import winSwitech from "../../assets/winSwitch.png";


function mymousescroll(event){
    if (event.deltaY < 0)
    {
     console.log('scrolling up');
     
    }
    else if (event.deltaY > 0)
    {
     console.log('scrolling down');
     
    }
    
   }

function FocusBarScroolShift () {
  return (
    <div id="focus-bar-scroll-shift" onWheel={(e)=>{mymousescroll(e)}}>
      <img src={winSwitech} alt="" />
    </div>
  )
}

export default FocusBarScroolShift 