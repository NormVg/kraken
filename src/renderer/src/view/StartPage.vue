<script setup>
import { ref } from "vue";
import banner from "../assets/banner.png";
import folder from "../assets/icons/folder.png";
import RecentFolder from "../components/RecentFolder.vue";

import { useWinBasicStore } from "../stores/basicInfo";
import { updateRecentFolderDB } from "../utils/WinBasicUtils";

const Win = useWinBasicStore();
const recentFolderList = ref([]);



const SetEditor = (val) => {

  window.electron.ipcRenderer.send("check-dir", val)
  window.electron.ipcRenderer.on("check-dir-reply", (e, r) => {

    if (r === true) {
      Win.ChangeFolder(val);
      Win.ChangeOnEditor(true);
    } else {
      alert(val + " Directory does not exist")
    }

  })
  // Win.ChangeFolder(val);
  // Win.ChangeOnEditor(true);
};

const getFolder = () => {
  window.electron.ipcRenderer.send("open-folder-selecter");
};
window.electron.ipcRenderer.on("open-folder-selecter-reply", (e, r) => {
  const reply = updateRecentFolderDB(r, recentFolderList.value);

  if (reply !== recentFolderList.value) {

    const que = {
      name: "recentfolder",
      resp: reply,
    };
    window.electron.ipcRenderer.send("write-db", JSON.stringify(que));


  }
  SetEditor(r);
});

window.electron.ipcRenderer.send("read-db", "recentfolder");
window.electron.ipcRenderer.on("read-db-reply-recentfolder", (e, r) => {
  recentFolderList.value = r;
});
</script>

<template>

  <div id="start-page-box">
    <div id="recent-box">
      <div id="open-folder-btn" @click="getFolder()">
        <span><img :src="folder" alt="" /></span> Open File or Folder
      </div>
      <div id="line-ele"></div>
      <div id="past-list-box">
        <RecentFolder v-for="item in recentFolderList" :key="item" :title="item.name" :path="item.path"
          @click="SetEditor(item.path)" />
      </div>
    </div>
    <div id="banner-box">
      <img :src="banner" alt="kraken banner" /><br />
      <!-- <div>:K:raken</div> -->
    </div>
  </div>
</template>

<style scoped>
#past-list-box {
  width: 80%;
  height: 500px;
  display: flex;
  margin-top: 15px;
  gap: 15px;
  justify-content: start;
  flex-direction: column;
  align-items: flex-start;
  /* border: 1px solid whitesmoke; */
  overflow-y: auto;
  /* overflow-x:hidden ; */
}

#open-folder-btn {
  background-color: #0a0d18;
  width: 80%;
  height: 35px;
  border: 1px solid #71738e;
  border-radius: 5px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 100px;
  transition: all 200ms ease-in-out;
}

#open-folder-btn:hover {
  background-color: #121522;
}

#open-folder-btn img {
  height: 20px;
  margin-bottom: -4px;
  margin-right: 5px;
}

#line-ele {
  width: 80%;
  height: 2px;
  border-bottom: 1px solid #71738e;
}

#recent-box {
  border-right: 1px solid #71738e;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

#banner-box div {
  margin-top: -45px;
  opacity: 0.5;
}

#banner-box {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 30px;
}

#banner-box img {
  width: 70%;
}

#start-page-box {
  width: 99vw;
  height: calc(99.7vh - 1px);
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 35% 65%;
}
</style>
