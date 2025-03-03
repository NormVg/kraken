<script setup>
import StartPage from './view/StartPage.vue';
import Header from './components/Header.vue';
import HousePage from './view/HousePage.vue';
import { useWinBasicStore } from './stores/basicInfo';

const WinBasic =  useWinBasicStore()

const CommandPalletStore = useCommandPalletStore()


window.electron.ipcRenderer.send("app-prod","")
  window.electron.ipcRenderer.on("app-prod-reply", (e, r) => {
    WinBasic.ChangeIsAppPackaged(r)


  })

import { tinykeys } from "tinykeys"
import { onMounted } from 'vue';
import { useCommandPalletStore } from './stores/CommandPalletStore';

onMounted(()=>{


  tinykeys(window, {
    "Control+Shift+o": (event) => {
    event.preventDefault()
    console.log("Control+Shift+o","Toggle File Opener")
  },

  "Control+Shift+b": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(!WinBasic.isSidebar)
  },
  "Control+Shift+f": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(true)
  },
  "Control+Shift+t": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(false)
  },

  "Control+Shift+Alt+Tab":(event)=>{
    event.preventDefault()
    WinBasic.PrevCurrentScreenWindow()
  },

  "Control+Alt+Tab":(event)=>{
    event.preventDefault()
    WinBasic.NextCurrentScreenWindow()
  },

  "Control+Shift+p":(event)=>{
    event.preventDefault()
    CommandPalletStore.ChangeIsCommandPallet(!CommandPalletStore.isCommandPallet)
  },

  "Shift+Alt+t":(event)=>{
    event.preventDefault()
    WinBasic.ChangeCurrentScreenWindow(1)
  },
"Shift+Alt+e":(event)=>{
    event.preventDefault()
    WinBasic.ChangeCurrentScreenWindow(0)
  },
  "k r a k e n i s a w s m": () => {
    alert("Kraken is awsm")
  },
  "$mod+([0-9])": event => {
    event.preventDefault()
    console.log(WinBasic.ScreenWindowTabs.length,Number(event.key))
    if (WinBasic.ScreenWindowTabs.length >= Number(event.key) ){

      WinBasic.ChangeCurrentScreenWindow(Number(event.key-1))
    }


  }
})

})



</script>

<template>

<Header/>

<StartPage v-if="!WinBasic.onEditor"/>
<HousePage v-else />
</template>


