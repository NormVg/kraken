<script setup>
import FocusBarTab from "./FocusBarUtils/FocusBarTab.vue";
import FocusBarScroolShift from "./FocusBarUtils/FocusBarScroolShift.vue";
import FocusBarToolsSideBar from "./FocusBarUtils/FocusBarToolsSideBar.vue";

import FocusBarToolsTerminal from "./FocusBarUtils/FocusBarToolsTerminal.vue";

import FocusBarToolsDotBtn from "./FocusBarUtils/FocusBarToolsDotBtn.vue";
import { useWinBasicStore } from "../stores/basicInfo";
import WebAppBtnTab from "./FocusBarUtils/WebAppBtnTab.vue";
import { ref } from "vue";
import { useWebAppStore } from "../stores/WebAppsStores";




const WinBasic = useWinBasicStore();
const WebAppStore = useWebAppStore()

// const WebAppList = ref([])

window.electron.ipcRenderer.send("read-db", "WebApps");
window.electron.ipcRenderer.on("read-db-reply-WebApps", (e, r) => {
  // WebAppList.value = r;
  WebAppStore.ChnageWebAppList(r)
});



</script>

<template>
  <div id="focus-bar">
    <div id="focus-win-scroll-switch">
      <FocusBarScroolShift />
    </div>

    <div id="focus-tabs" class="my-scrollable-div">
      <FocusBarTab
        v-for="win in WinBasic.CodeEditorTab"
        :key="win"
        :name="win.name"
        :path="win.path"
      />

    </div>

    <div id="focus-apps">

        <WebAppBtnTab v-for="item in WebAppStore.WebAppList" :key="item" :data="item" />

      </div>


    <div id="focus-tools">
      <FocusBarToolsDotBtn />
      
      <FocusBarToolsTerminal />
      <FocusBarToolsSideBar />
    </div>
  </div>
</template>

<style scoped>
#focus-bar {
  width: calc(100% - 50px);
  height: 30px;
  border-radius: 7px;
  background-color: #0a0d18;
  border: 1px solid #71738e;
  position: fixed;
  color: white;
  bottom: 30px;
  align-self: center;
  justify-self: center;
  left: 25px;
  right: 25px;

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0px 10px;
  gap: 10px;
  z-index: 15;
  transition: 350ms ease-in-out;
}

#focus-tabs {
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 22px;
}

#focus-tools {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  /* margin-left: auto; */
  border-left: 1px solid whitesmoke;
}


#focus-apps {
  display: flex;
  align-items: center;
  gap: 7px;
  padding-left: 10px;
  margin-left: auto;
  border-left: 1px solid whitesmoke;
}
</style>
