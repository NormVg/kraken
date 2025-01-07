<script setup>
import CodeEditorManager from "../components/CodeEditorManager.vue";
import FocusBar from "../components/FocusBar.vue";
import WebView from "../components/WebView.vue";
import SideBar from "../components/SideBar.vue";
import ScreenTab from "../components/ScreenManager/ScreenTab.vue";
import ScreenTabManager from "../components/ScreenManager/ScreenTabManager.vue";
import { useWinBasicStore } from "../stores/basicInfo";

import { computed, onMounted, onUnmounted, useCssVars } from "vue";
import { useWebAppStore } from "../stores/WebAppsStores";

const WinBasic = useWinBasicStore();
const WebAppStore = useWebAppStore()

const ScreenSideBarStyle = computed(() => {
  return WinBasic.isSidebar
    ? "width:calc(100vw - 35% - 2px)"
    : "width:calc(100vw - 2px);";
});

onMounted(()=>{
  document.body.className = "with-banner" 
})

onUnmounted(()=>{
  document.body.className = "" 
})

</script>

<template>
  <div id="screen" :style="ScreenSideBarStyle">
    <ScreenTabManager
      :currentTab="WinBasic.CurrentScreenWindow"
      :updateTabsList="WinBasic.ChangeScreenWindowTabs"
    >
      <ScreenTab WinID="code-editor-one">
        <CodeEditorManager />
      </ScreenTab>

      <ScreenTab :WinID="`WebView-${item.name}`" v-for="item in WebAppStore.activeWebAppTabs" :key="item" >
        <WebView :data="item" />
      </ScreenTab>


    </ScreenTabManager>

    <FocusBar />
  </div>
  <SideBar />
</template>

<style scoped>
#screen {
  height: calc(100vh - 40px);
  position: fixed;
  left: 0%;
  top: calc(50% + 15px);
  transform: translateY(-50%);
  transition: 350ms ease-in-out;
}

/* body {
  background-image: url("../assets/banner.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 40vh;
  background-size: 15%;
} */
</style>
