<script setup>
import { ref, computed } from "vue";
import { useWinBasicStore } from "../stores/basicInfo";
import FolderFileComp from "./FolderFileComp.vue";

const WinBasic = useWinBasicStore();

const DirList = ref([{ name: "hello" }]);

window.electron.ipcRenderer.send("path-list", WinBasic.FolderPath);
window.electron.ipcRenderer.on(
  "path-list-reply-" + WinBasic.FolderPath,
  (e, r) => {
    console.log(JSON.parse(r));
    DirList.value = JSON.parse(r);

    DirList.value.forEach((element) => {
      console.log(element.name);
    });
  }
);

const isFxBarStyle = computed(() => {
  return WinBasic.isFileXSideBar ? "display:block;" : "display:none;";
});
</script>

<template>
  <div id="fileX-box" :style="isFxBarStyle">
    <FolderFileComp v-for="item in DirList" :key="item" :data="item" />
  </div>
</template>

<style scoped>
#fileX-box {
  color: whitesmoke;

  height: 88%;
  width: 95%;
  overflow: auto;
  padding-top: 10px;
  border-left: 1px solid #71738e;
}
</style>
