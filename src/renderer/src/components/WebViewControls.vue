<script setup>
import Rleft from "../assets/icons/relay-left.png";
import Rright from "../assets/icons/relay-right.png";
import Rreload from "../assets/icons/relay-reload.png";

import Rclose from "../assets/icons/close.png";
import { useWinBasicStore } from "../stores/basicInfo";
import { computed, onMounted } from "vue";
import { useWebAppStore } from "../stores/WebAppsStores";


const WinBasic = useWinBasicStore();
const WebAppStore = useWebAppStore();

const currentTab = computed(() => {
  const index = WinBasic.CurrentScreenWindow;
  const name = WinBasic.ScreenWindowTabs[index];

  return name ? name : "<>";
});

const barURL = computed(()=>{
  // console.log(currentTab.value)
  if (currentTab.value.includes("WebView")){
    var call = currentTab.value.replace("WebView-","")

    var index = WebAppStore.IndexOfActiveWebAppList(call)
    
    var info = WebAppStore.activeWebAppTabs[index]
    return info.urlNow

  }else{

    return ""
  }


})

const CloseWebTab = () => {
  
  if (currentTab.value.includes("WebView")) {
    const list = WinBasic.ScreenWindowTabs;
    const index = WinBasic.CurrentScreenWindow;

    if (index >= 0 && index < list.length) {
      var cName = currentTab.value.replace("WebView-","")
      WebAppStore.RemoveActiveFromWebAppList({"name":cName})
      console.log(WinBasic.ScreenWindowTabs,"+++++<>++++++",cName,WebAppStore.activeWebAppTabs)

      list.splice(index, 1);
      WinBasic.ChangeScreenWindowTabs(list);

      WinBasic.ChangeCurrentScreenWindow(index - 1);
      // console.log(WinBasic.ScreenWindowTabs,"+++++<>++++++")
    }
  }
};

// onMounted(()=>{

const goBack = ()=>{

  if (currentTab.value.includes("WebView")) {
    var call = currentTab.value.replace("WebView-","")
    var webview = document.getElementById("web-view-"+call)

    if (webview.canGoBack()) {
        webview.goBack();
      }
  }
}

const goForward = ()=>{

if (currentTab.value.includes("WebView")) {
    var call = currentTab.value.replace("WebView-","")
    var webview = document.getElementById("web-view-"+call)
    
    if (webview.canGoForward()) {
        webview.goForward();
      }
  }

}


const goReload = ()=>{

if (currentTab.value.includes("WebView")) {
    var call = currentTab.value.replace("WebView-","")
    var webview = document.getElementById("web-view-"+call)
    
    
        webview.reload();
      
  }

}


// })

</script>

<template>
  <div id="wvc-box">
    <button><img :src="Rleft" @click="goBack"/></button>
    <button><img :src="Rreload"  @click="goReload" /></button>
    <button><img :src="Rright" @click="goForward"/></button>
    <input type="text" :value="barURL" disabled/>
    <button @click="CloseWebTab"><img :src="Rclose" /></button>
  </div>
</template>

<style scoped>
button img {
  width: 20px;
  height: 20px;
  background: none;
}
button {
  background: none;
  border: none;
  border-radius: 5px;
  transition: all ease-in-out 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
button:active {
  outline: 1px solid #ececf1;
}
button:hover {
  background-color: #53556e;
  border: none;
}
input {
  border: none;
  background: none;
  color: #7a7a7a;
  border-radius: 5px;
  height: 20px;
  width: 100%;
  padding: 0px 10px;
}
input:hover {
  background-color: #323342;
}
input:focus {
  background-color: #53556e;
  /* outline: none; */
  outline: 1px solid #ececf1;
  color: #ececf1;
}
#wvc-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
}
</style>
