import React, { useContext } from 'react'
import winSwitech from "../../assets/winSwitch.png";


import { EditorWorkSpaceDisplayContext } from '../../context/EditorContext'
import { EditorScreenContext } from '../../context/EditorScreenContext';


function getNewIndex(index, direction, array) {
  const arrayLength = array.length;

  if (arrayLength === 0) {
      throw new Error("Array is empty");
  }

  if (direction === "left") {
      return (index - 1 + arrayLength) % arrayLength;
  } else if (direction === "right") {
      return (index + 1) % arrayLength;
  } else {
      throw new Error("Invalid direction. Use 'left' or 'right'.");
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function FocusBarScroolShift () {

  const Ewdc = useContext(EditorWorkSpaceDisplayContext)
  const EditorScreen = useContext(EditorScreenContext)



  
  function ScreenSwitchCalc(dir){
    const EScreenValue = [...EditorScreen.EditorScreenValue] 
    const EScreen = EditorScreen.CurrentScreenValue
    const EScreenIndex = EScreenValue.indexOf(EScreen)
    const a =  getNewIndex(EScreenIndex,dir,EScreenValue)
    
    return EScreenValue[a]
  }


   const myMouseScroll = debounce((event) => {
    // Handle your scroll event here
    console.log('Wheel event debounced', event);

    if (event.deltaY < 0)
      {
       
      const a = ScreenSwitchCalc("left")
      
      
      console.log('scrolling up');
      EditorScreen.ToggleWorkScreen(a)
       
      }
      else if (event.deltaY > 0)
      {
       console.log('scrolling down');
       const a = ScreenSwitchCalc("right")
      
      EditorScreen.ToggleWorkScreen(a)
      
      }

}, 200);



  return (
    // <div id="focus-bar-scroll-shift" onWheel={ (e)=>{ mymousescroll( e)}}>
    //   <img src={winSwitech} alt="" />
    // </div>

    <div id="focus-bar-scroll-shift" onWheel={myMouseScroll}>
      <img src={winSwitech} alt="" />
    </div>
  )
}

export default FocusBarScroolShift 