
import './App.css';
import { useState } from 'react';
import MyEditor from './components/MyEditor';
import HomePage from './components/HomePage';
import HeaderBar from './components/HeaderBar';




function App() {

  return (
    <div className="App" >
      
      <HeaderBar/>
      <HomePage/>
      
    </div>
  );
}

export default App;
