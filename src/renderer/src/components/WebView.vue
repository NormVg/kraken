<template>
  <div className="app-view-box ">
    <div>
      <webview
      
        :id="webviewID"
        :src="prop.data.src"
        allowpopups="true"
      ></webview>
    </div>
  </div>
</template>

<script setup>
import {  onMounted, ref, watch } from "vue";
import { useWebAppStore } from "../stores/WebAppsStores";
import { useWinBasicStore } from "../stores/basicInfo";

const prop = defineProps({
  data: {
    typeof: Object,
    default: "https://google.com",
  },
});

const webviewID = "web-view-" + prop.data.name;

const WebAppStore = useWebAppStore();
const WinBasic = useWinBasicStore();

const srcURL = ref(prop.data.src);



watch(srcURL, () => {
  const index = WebAppStore.IndexOfActiveWebAppList(prop.data.name)
  var info = WebAppStore.activeWebAppTabs
  info[index].urlNow = srcURL.value
  
  WebAppStore.ChangeActiveWebAppTabs(info)
 console.log("SRC url watch ",info)
  


  

});



onMounted(() => {

  console.log(WebAppStore.activeWebAppTabs)

  const webview = document.getElementById(webviewID);

  webview.addEventListener("did-navigate", (event) => {
    srcURL.value = event.url;
    console.log("New URL (did-navigate):", event.url); // Triggered on main frame navigation
  });

  webview.addEventListener("did-navigate-in-page", (event) => {
    srcURL.value = event.url;
    console.log("New URL (did-navigate-in-page):", event.url); // Triggered on in-page navigation (e.g., hash changes)
  });
});



</script>

<style scoped>
.app-view-box {
  /* background-image: url("../assets//banner.png"); */
  height: 85vh;

  border: 2px solid #c499db;
  border-radius: 7px;
  width: calc(100% - 30px);

  overflow: hidden;
  margin-right: 15px;
  margin-left: 15px;
  /* 
  background-repeat: no-repeat;
  background-position: center; */
  background-color: #0a0d1877;
  /* background-size: 250px; */

  -webkit-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
  -moz-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
  box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);

  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.app-view-box div {
  height: 100%;
  width: 100%;
}

.app-view-box div webview {
  height: 100%;
  width: 100%;
}
</style>
