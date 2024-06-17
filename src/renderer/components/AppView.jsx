import React from 'react'

import prelogo from "../assets/prelogo.png"
// const WebView = window.require('react-electron-web-view');


import "../css/AppViewStyle.css"

function AppView({url,name,icon}) {
  console.log("opening web for ",name)
  return (
    <div  className='app-view-box' style={{ backgroundImage: `url(${prelogo})` }} >
      
      <div>
      <webview id="foo" src={url} ></webview>
      </div>
    {/* <WebView className="app-webview" src={url} /> */}
    </div>
  )
}

export default AppView