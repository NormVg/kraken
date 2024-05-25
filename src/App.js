
import './App.css';
import { useState } from 'react';
import HomePage from './components/HomePage';
import HeaderBar from './components/HeaderBar';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import EditorPage from './components/EditorPage';



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
      
      
      
      <RouterProvider router={router}/>
      
    </div>
  );
}

export default App;
