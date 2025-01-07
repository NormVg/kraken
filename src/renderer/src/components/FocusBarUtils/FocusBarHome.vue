<template>
    <div id="focus-bar-tools" @click="SwitchToCodeEditor">
      <img :src="editor" />
    </div>
  </template>
  
  <script setup>
  import editor from "../../assets/icons/editor.png";
  import { useWinBasicStore } from "../../stores/basicInfo";
  
  const WinBasic = useWinBasicStore()
  
  const SwitchToCodeEditor = ()=>{
    if (WinBasic.CurrentScreenWindow !== 0){
    WinBasic.ChangeCurrentScreenWindow(0)
  }
      
  }
  
  </script>
  
  <style>
  #focus-bar-tools {
    aspect-ratio: 1/1;
    height: 22px;
    width: 22px;
  
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
  }
  
  #focus-bar-tools img:hover {
    background-color: #272a29;
  }
  #focus-bar-tools img {
    height: 25px;
    border-radius: 3px;
  }
  #focus-bar-tools img:active {
    outline: 1px solid #ececf1;
  }



  
  </style>
  