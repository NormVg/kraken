<script setup>
import StartPage from './view/StartPage.vue';
import Header from './components/Header.vue';
import HousePage from './view/HousePage.vue';
import { useWinBasicStore } from './stores/basicInfo';

const WinBasic =  useWinBasicStore()




import { tinykeys } from "tinykeys" // Or `window.tinykeys` using the CDN version
import { onMounted } from 'vue';

onMounted(()=>{


  tinykeys(window, {
  "Control+Shift+s": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(!WinBasic.isSidebar)
  },
  "Control+Shift+e": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(true)
  },
  "Control+Shift+t": (event) => {
    event.preventDefault()
    WinBasic.ChangeIsSideBar(true)
    WinBasic.ChangeIsFileXSideBar(false)
  },

  "Control+Shift+Arrowleft":(event)=>{
    event.preventDefault()
    WinBasic.PrevCurrentScreenWindow()
  },

  "Control+Shift+ArrowRight":(event)=>{
    event.preventDefault()
    WinBasic.NextCurrentScreenWindow()
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



// import useHotkey from 'vue3-hotkey'
// import { ref } from 'vue'
// const hotkeys = ref([
//   {
//     keys: ['ctrl','e'],
//     preventDefault: true,
//     handler(keys) {
//         WinBasic.ChangeIsSideBar(!WinBasic.isSidebar)
//     }
//   },
//   {
//     keys: ['ctrl','shift','right'],
//     preventDefault: true,
//     handler(keys) {
//       WinBasic.NextCurrentScreenWindow()
//     }
//   },
//   {
//     keys: ['ctrl','shift','left'],
//     preventDefault: true,
//     handler(keys) {
//       WinBasic.PrevCurrentScreenWindow();
//     }
//   }

// ])
// const stopArr = useHotkey(hotkeys.value)

// // 取消监听快捷键
// const removeHotKeys = (hk) => {
//   stopArr.foreach((item) => item())
// }

</script>

<template>

<Header/>

<StartPage v-if="!WinBasic.onEditor"/>
<HousePage v-else />
</template>


