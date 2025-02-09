<script setup>
import { ref, computed, onMounted } from "vue";
import { useWinBasicStore } from "../stores/basicInfo";
import FolderFileComp from "./FolderFileComp.vue";
import AddFile from "../assets/icons/add-file.svg"
import AddFolder from "../assets/icons/add-folder.svg"

import {listDirectory} from "../utils/SysManage"
import NewFileFolder from "./NewFileFolder.vue";

const WinBasic = useWinBasicStore();

const DirList = ref([]);

// window.electron.ipcRenderer.send("path-list", WinBasic.FolderPath);
// window.electron.ipcRenderer.on(
//   "path-list-reply-" + WinBasic.FolderPath,
//   (e, r) => {
//     DirList.value = JSON.parse(r);

//     DirList.value.forEach((element) => {});
//   }
// );

const loadDir  = async ()=>{
  DirList.value = await listDirectory(WinBasic.FolderPath) 
}

loadDir()


const RootName = WinBasic.FolderPath.split('/').pop();

// const isFxBarStyle = computed(() => {
//   return WinBasic.isFileXSideBar ? "display:block;" : "display:none;";
// });

const newActiveFF = ref(false)
const newActiveFolder = ref(false)


const createNewFile = () => {
  newActiveFF.value = true;
  newActiveFolder.value = false
};

const createNewFolder = () => {
  newActiveFF.value = true;
  newActiveFolder.value = true
  
};

const handleBlur = () => {
  newActiveFF.value = false;
};



</script>

<template>
  <div id="fileX-box" >
    <div id="filex-tool-opt">
      <div id="filex-tool-name">

        {{RootName}}
      </div>
      <div class="filex-tool-btn" @click="createNewFile" ><img :src="AddFile" alt=""></div>
      <div class="filex-tool-btn" @click="createNewFolder"><img :src="AddFolder" alt=""></div>
    </div>
    <NewFileFolder v-if="newActiveFF" :onBlurCall="handleBlur" :path="WinBasic.FolderPath" :isFolder="newActiveFolder" :reloadDirCall="loadDir" />
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



.filex-tool-btn:hover {
  background-color: #1f2337;
}

.filex-tool-btn:active {
  background-color: #1b1f30;
}
.filex-tool-btn {
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  opacity: 0;
  transition: all ease-in-out 200ms;
}

#filex-tool-name{
  margin-right: auto;
}

#filex-tool-opt img{
  height: 18px;
  width: 18px;
}

#filex-tool-opt {
  margin-bottom: 10px;
  height: 20px;
  width:90%;
  
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  padding: 0px 10px;
  background-color: #FF838350;
  
}

#filex-tool-opt:hover .filex-tool-btn{
  opacity: 1;
}
</style>
