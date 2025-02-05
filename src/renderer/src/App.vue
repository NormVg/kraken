<script setup>
import StartPage from './view/StartPage.vue';
import Header from './components/Header.vue';
import HousePage from './view/HousePage.vue';
import { useWinBasicStore } from './stores/basicInfo';

const WinBasic =  useWinBasicStore()

const CommandPalletStore = useCommandPalletStore()


import { tinykeys } from "tinykeys" // Or `window.tinykeys` using the CDN version
import { onMounted } from 'vue';
import { useCommandPalletStore } from './stores/CommandPalletStore';

onMounted(()=>{


  tinykeys(window, {
  "Control+Shift+s": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(!WinBasic.isSidebar)
  },
  "Control+e": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(true)
  },
  "Control+t": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(false)
  },

  "Control+Arrowleft":(event)=>{
    event.preventDefault()
    WinBasic.PrevCurrentScreenWindow()
  },

  "Control+ArrowRight":(event)=>{
    event.preventDefault()
    WinBasic.NextCurrentScreenWindow()
  },

  "Control+p":(event)=>{
    event.preventDefault()
    CommandPalletStore.ChangeIsCommandPallet(!CommandPalletStore.isCommandPallet)
  },

  "k r a k e n i s a w s m": () => {
    alert("Kraken is awsm")
  },
  "$mod+([0-9])": event => {
    event.preventDefault()
    alert(`Either 'Control+${event.key}' or 'Meta+${event.key}' were pressed`)
  },
})

})



</script>

<template>

<Header/>

<StartPage v-if="!WinBasic.onEditor"/>
<HousePage v-else />
</template>


