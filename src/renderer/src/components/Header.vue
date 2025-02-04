<script setup>
import WebViewControls from "./WebViewControls.vue";
import { useWinBasicStore } from "../stores/basicInfo";
import { compile, computed } from "vue";
const WinTitle = useWinBasicStore();


function AppClose(){
    
    window.electron.ipcRenderer.send("app-close")  
}
function AppMax(){
    window.electron.ipcRenderer.send("app-max")  
}
function AppMin(){
    window.electron.ipcRenderer.send("app-min")  
}




</script>

<template>
  <div id="win-head">
    <div id="win-title">{{ WinTitle.TitleVal }}</div>
    <Transition>

      <div id="win-center-pannel" v-if="WinTitle.isMiddleBar">
        <WebViewControls/>
      </div>
    </Transition>
    <div id="win-controls">
      <div id="win-min" class="win-cb" @click="AppMin()"></div>
      <div id="win-max" class="win-cb" @click="AppMax()"></div>
      <div id="win-close" class="win-cb" @click="AppClose()"></div>
    </div>
  </div>
</template>

<style scoped>
#win-center-pannel{
  /*   display: flex;
  align-items: center;
  justify-content: left;
  
  padding: 0px 20px; */
  
  z-index: 30;
  background-color: #0a0d18;
  position: fixed;
  
  top: 15px;
  width: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  border-top: 2px solid white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  
  display: flex;
  align-items: center;
  justify-content: left;
  
  padding: 0px 20px;

  
}
#win-title {
  background-color: #0a0d18;
  position: fixed;
  left: 0%;
  top: 0%;
  padding: 0px 5px;
  min-width: 120px;
  height: 30px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 10px;
  
  border-left: 1px solid whitesmoke;
  border-top: 1px solid whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
  padding: 0px 20px;
}
#win-controls {
  z-index: 30;
  background-color: #0a0d18;

  position: fixed;
  right: 0%;
  top: 0%;

  padding: 0px 5px;

  height: 30px;
  min-width: 120px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 10px;
  border-top-right-radius: 10px;
  border-right: 1px solid whitesmoke;
  border-top: 1px solid whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  -webkit-app-region: drag;
}

.win-cb{
    width: 16px;
    height: 16px;
    background-color: #1b1e2b;
    border-radius: 100%;
    transition: all ease-in-out 200ms;
    -webkit-app-region: no-drag;
}
#win-close:hover{
    background-color: #FF4343;
    border-radius: 5px;
    width: 25px;
}
#win-max:hover{
    background-color: #08C371;
    border-radius: 5px;
    width: 25px;
}
#win-min:hover{
    background-color: #FED31D;
    border-radius: 5px;
    width: 25px;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>