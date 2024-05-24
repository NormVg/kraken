import React from 'react'
import prelogo from "../assets/prelogo.png"
import "../css/HomePageStyle.css"
import ResentBox from './ResentBox'
export default function HomePage() {
  return (
    <div id='home'>
    <img id='prelogo' src={prelogo}  />
    <div id='line-home'></div>
    <ResentBox/>
    </div>
  )
}
