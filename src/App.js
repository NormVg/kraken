
import './App.css';
import { useState } from 'react';
import HomePage from './components/HomePage';
import HeaderBar from './components/HeaderBar';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import EditorPage from './components/EditorPage';


import {EditorSidebarToggleProvider, EditorWorkSpaceDisplayProvider} from "./context/EditorContext"

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      
      element:<> <HeaderBar/> <HomePage /></>
    },
    {
      path:"/kraken",
      element:<> <HeaderBar/> <EditorPage /></>
    }

  ])
  return (
    <div className="App" >
      <EditorSidebarToggleProvider>
      <EditorWorkSpaceDisplayProvider>
      
      <RouterProvider router={router}/>
      
      </EditorWorkSpaceDisplayProvider>
      </EditorSidebarToggleProvider>
    </div>
  );
}

export default App;
