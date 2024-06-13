import React from 'react'

const WebView = window.require('react-electron-web-view');

import "../css/AppViewStyle.css"

function AppView() {
  return (
    <div  className='app-view-box' >
    <WebView className="app-webview" src="https://www.github.com/NormVg/kraken" />
    </div>
  )
}

export default AppView