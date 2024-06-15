import React,{useContext} from 'react'
import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import EditorPage from './EditorPage';
import { AppEHContext } from '../context/AppContext';
import EditorPageSec from './EditorPageSec';

function MainPage() {
    const Aeh = useContext(AppEHContext);
    function setApp() {
      console.log(Aeh.AehValue)
      if (Aeh.AehValue == null){
        return true
      }else{
        return false

      }
    }
    
    const s = setApp()
  return (
    <>
    <HeaderBar/>
    
    {/* {s? <HomePage/> : <EditorPage/>} */}
    {s? <HomePage/> : <EditorPageSec/>}

    </>
  )
}

export default MainPage