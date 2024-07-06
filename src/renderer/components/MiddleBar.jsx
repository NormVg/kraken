import React from 'react'

import left from "../assets/icons/relay-left.png"
import right from "../assets/icons/relay-right.png"
import reload from "../assets/icons/relay-reload.png"
import close from "../assets/icons/close.png"
function MiddleBar() {

  return (
    <div id='h-center' style={{}}>
      
      <div id='middle-box'>
      <div className='middle-btn' ><img src={left} alt="left" /></div>
      <div className='middle-btn' ><img src={reload} alt="reload" /></div>
      <div className='middle-btn' ><img src={right} alt="right" /></div>
      
      <input className='middle-input' type="url" placeholder='https://app.com'/>
      <div className='middle-btn' ><img src={close} alt="close" /></div>
      </div>
    </div>
  )
}

export default MiddleBar