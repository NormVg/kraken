<template>
  <div id="editor-side-bar" :style="SideBarStyle">


    <FileExplorerBar v-show="WinBasic.isFileXSideBar" />
    <ToolCar v-show="!WinBasic.isFileXSideBar" />
    
    <div id="footer-toggle-bar" @mousewheel="onWheelSideBarTabToggle">
      <div
        id="footer-bar-fe"
        @click="SideBarTabToggle(true)"
        :style="FxStyle"
      ></div>
      <div
        id="footer-bar-tool"
        @click="SideBarTabToggle(false)"
        :style="ToolStyle"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWinBasicStore } from "../stores/basicInfo";
import FileExplorerBar from "./FileExplorerBar.vue";
import ToolCar from "./ToolCar.vue";
const WinBasic = useWinBasicStore();

const SideBarStyle = computed(() => {
  return WinBasic.isSidebar
    ? {
        width: " 35%",
      }
    : {
        width: " 0%",
      };
});

const onWheelSideBarTabToggle = (e) => {
  if (e.deltaY < 0) {
    //  alert('scrolling up');
    WinBasic.ChangeIsFileXSideBar(true);
  } else if (e.deltaY > 0) {
    //  alert('scrolling down');
    WinBasic.ChangeIsFileXSideBar(false);
  }
};

const SideBarTabToggle = (val) => [WinBasic.ChangeIsFileXSideBar(val)];

const FxStyle = computed(() => {
  return WinBasic.isFileXSideBar
    ? "height: 15px;background-color: whitesmoke;"
    : "  height: 13px;  background-color: gray;";
});
const ToolStyle = computed(() => {
  return WinBasic.isFileXSideBar
    ? "  height: 13px;  background-color: gray;"
    : "height: 15px;background-color: whitesmoke;";
});
</script>

<style scoped>
#editor-side-bar {
  background-color: #0a0d18;

  height: 100%;
  z-index: 10;
  position: fixed;
  right: 0%;
  border-radius: 10px;
  transition: 350ms ease-in-out;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#footer-toggle-bar {
  width: 75%;
  height: 20px;

  margin-bottom: 10px;
  position: absolute;
  bottom: 0%;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

#footer-bar-fe {
  height: 15px;
  background-color: whitesmoke;
  width: 50%;
  border-radius: 5px;
  transition: all ease-in-out 150ms;
}

#footer-bar-tool {
  height: 13px;
  background-color: gray;
  width: 50%;
  border-radius: 3px;
  transition: all ease-in-out 150ms;
}
</style>
