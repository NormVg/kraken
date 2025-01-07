<script setup>
import { computed, ref } from "vue";
import FxFolder from "../assets/icons/fx-folder.png";
import FxOpenFolder from "../assets/icons/fx-openfolder.png";
import FxFile from "../assets/icons/fx-file.png";
import FxImage from "../assets/icons/fx-image.png";
import { useWinBasicStore } from "../stores/basicInfo";
const prop = defineProps({
  data: {},
});

const WinBasic = useWinBasicStore();

const isFolderActive = ref(false);

const isFolder = computed(() => {
  return prop.data.type === "directory" ? true : false;
});

const isImage = computed(() => {
  return prop.data.type === "image" ? true : false;
});

const DirList = ref([]);

window.electron.ipcRenderer.on("path-list-reply-" + prop.data.path, (e, r) => {
 
  DirList.value = JSON.parse(r);

  DirList.value.forEach((element) => {
 
  });
});

const switchActiveFolder = () => {
  if (isFolderActive.value) {
    isFolderActive.value = false;
  } else {
    window.electron.ipcRenderer.send("path-list", prop.data.path);

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
</script>

<template>
  <div v-if="isFolder" id="folder-comp">
    <span @click="switchActiveFolder()" id="folder-comp-name">
      <span>
        <img v-if="!isFolderActive" :src="FxFolder" />
        <img v-if="isFolderActive" :src="FxOpenFolder" />
      </span>
      {{ prop.data.name }}</span
    >

    <div id="inner-folder-box" v-if="isFolderActive">
      <FolderFileComp v-for="item in DirList" :key="item" :data="item" />
    </div>
  </div>

  <div v-else-if="isImage" id="file-comp">
    <span>
      <img v-if="isImage" :src="FxImage" />
    </span>
    {{ prop.data.name }}
  </div>

  <div v-else id="file-comp" @click="openFile">
    <span>
      <img :src="FxFile" />
    </span>
    {{ prop.data.name }}
  </div>
</template>

<style scoped>
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
