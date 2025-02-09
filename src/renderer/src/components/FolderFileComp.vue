<script setup>
import { computed, ref } from "vue";

import { useWinBasicStore } from "../stores/basicInfo";

import {getFolderCode, getIconCode} from "../utils/getFileFolderIcon"
import { listDirectory } from "../utils/SysManage";
import NewFileFolder from "./NewFileFolder.vue";

import AddFile from "../assets/icons/add-file.svg"
import AddFolder from "../assets/icons/add-folder.svg"

const prop = defineProps({
  data: {},
});

const WinBasic = useWinBasicStore();

const isFolderActive = ref(false);


const FileIcon = computed(()=>{

  const Lpath  = WinBasic.isAppPackaged ?  window.os.homedir()+ `/KrakenCode` + "/mocha_icon/" + getIconCode(prop.data.name) + ".svg" : "/mocha_icon/"+ getIconCode(prop.data.name) + ".svg"
  // console.log(Lpath)
  return Lpath

})

const FolderIconClose =  computed(()=>{
   
  const Lpath  = WinBasic.isAppPackaged ?  window.os.homedir()+ `/KrakenCode` + "/mocha_icon/" + getFolderCode(prop.data.name) + ".svg" : "/mocha_icon/"+ getFolderCode(prop.data.name) + ".svg"
  // console.log(Lpath)
  return Lpath
})

const FolderIconOpen =  computed(()=>{
  //  return "/mocha_icon/"+ getFolderCode(prop.data.name) + "_open.svg"

   const Lpath  = WinBasic.isAppPackaged ?  window.os.homedir()+ `/KrakenCode` + "/mocha_icon/" + getFolderCode(prop.data.name) + "_open.svg" : "/mocha_icon/"+ getFolderCode(prop.data.name) + "_open.svg"
  // console.log(Lpath)
  return Lpath
})

const isFolder = computed(() => {
  return prop.data.type === "directory" ? true : false;
});



const DirList = ref([]);



const  loadDir  = async ()=>{
  DirList.value = await listDirectory(prop.data.path) 
}

// loadDir()

const switchActiveFolder = async () => {
  if (isFolderActive.value) {
    isFolderActive.value = false;
  } else {
    // window.electron.ipcRenderer.send("path-list", prop.data.path);
    await loadDir()
    isFolderActive.value = true;
  }
};

const openFile = () => {
  var winTab = WinBasic.CodeEditorTab;

  const isTab = WinBasic.CodeEditorTab.some(
    (item) => item.name === prop.data.name && item.path === prop.data.path
  );

  if (!isTab) {
    winTab.push({
      name: prop.data.name,
      path: prop.data.path,
    });

    
  } else {
    
    console.log("file allredy exist");
  }

  WinBasic.ChangeCodeEditorTab(winTab);
  if (WinBasic.CurrentScreenWindow !== 0){
    WinBasic.ChangeCurrentScreenWindow(0)
  }
  WinBasic.switchToCodeTab(prop.data)
};




const newActiveFF = ref(false)
const newActiveFolder = ref(false)


const createNewFile = () => {
  newActiveFF.value = true;
  newActiveFolder.value = false
  // isFolderActive.value = false;
};

const createNewFolder = () => {
  newActiveFF.value = true;
  newActiveFolder.value = true
  // isFolderActive.value = false;
  
};

const handleBlur = () => {
  newActiveFF.value = false;
};



</script>

<template>
  <div v-if="isFolder" id="folder-comp">
    <span @click="switchActiveFolder()" id="folder-comp-name">
      <span>
        <img v-if="!isFolderActive" :src="FolderIconClose" />
        <img v-if="isFolderActive" :src="FolderIconOpen" />
      </span>
      {{ prop.data.name }}

      <div class="filex-tool-btn" @click="createNewFile" ><img :src="AddFile" alt=""></div>
      <div class="filex-tool-btn" @click="createNewFolder"><img :src="AddFolder" alt=""></div>
    </span> 
      <div id="inner-folder-box" v-if="isFolderActive">
      <NewFileFolder v-if="newActiveFF" :onBlurCall="handleBlur" :path="prop.data.path" :isFolder="newActiveFolder" :reloadDirCall="loadDir" />
      <FolderFileComp v-for="item in DirList" :key="item" :data="item" />
    </div>
  </div>



  <div v-else id="file-comp" @click="openFile">
    <span>
      <!-- <img :src="FxFile" /> -->
      <img :src="FileIcon" />
    </span>
    {{ prop.data.name }}
  </div>
</template>

<style scoped>
#folder-comp:hover .filex-tool-btn{
  opacity: 1;
}

.filex-tool-btn:hover {
  background-color: #1f2337;
}

.filex-tool-btn:active {
  background-color: #1b1f30;
}
.filex-tool-btn {
  opacity: 0;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  transition: all ease-in-out 200ms;
  
}
.filex-tool-btn:first-of-type{
  margin-left: auto;
  margin-right: 0px;
}

#inner-folder-box {
  border-left: 1px solid #71738e;
}

#folder-comp-name {
  height: 20px;
  /* max-width: 90%; */
  min-width:90%;
  display: flex;
  justify-content: flex-start;
  align-items: left;
  gap: 5px;
  max-width: fit-content;
  white-space: nowrap;
}

#folder-comp-name:hover {
  background-color: #121522;
}
#folder-comp-name:active {
  background-color: #1b1f30;
}

#folder-comp img,
#file-comp img {
  height: 15px;
  margin-top: 3px;
}
#folder-comp {
  min-height: 20px;
  max-width: 90%;
  font-weight: 100;
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  padding: 0px 10px;
  gap: 5px;
  /* max-width: fit-content;
  white-space: nowrap; */
  margin-bottom: 5px;
}

#file-comp:hover {
  background-color: #121522;
}

#file-comp:active {
  background-color: #1b1f30;
}

#file-comp {
  height: 20px;
  min-width:90%;
  font-weight: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 0px 10px;
  gap: 5px;
  margin-bottom: 5px;
  max-width: fit-content;
  white-space: nowrap;
}
</style>
