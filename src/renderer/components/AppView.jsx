import React, { useEffect, useRef } from 'react'

import prelogo from "../assets/prelogo.png"
// const WebView = window.require('react-electron-web-view');


import "../css/AppViewStyle.css"

function AppView({url,name,icon}) {
  console.log("opening web for ",name)

  const webviewRef = useRef(null);

  useEffect(() => {
    const webview = webviewRef.current;

    if (webview) {
      // Example event listeners for `webview`
      const handleLoadCommit = (event) => {
        console.log('Page load commit:', event);
      };

      const handleDidFinishLoad = () => {
        console.log('Page did finish loading');
      };

      const handleDidFailLoad = (event) => {
        console.error('Failed to load page:', event);
      };

      // Adding event listeners
      webview.addEventListener('did-finish-load', handleDidFinishLoad);
      webview.addEventListener('did-fail-load', handleDidFailLoad);
      webview.addEventListener('load-commit', handleLoadCommit);

      // Cleanup event listeners on unmount
      return () => {
        webview.removeEventListener('did-finish-load', handleDidFinishLoad);
        webview.removeEventListener('did-fail-load', handleDidFailLoad);
        webview.removeEventListener('load-commit', handleLoadCommit);
      };
    }
  }, []);



  return (
    <div  className='app-view-box' style={{  backgroundImage: `url(${prelogo})` }} >
      
      <div>
      <webview ref={webviewRef} id="foo" src={url} allowpopups='true' ></webview>
      </div>
    
    </div>
  )
}

export default AppView