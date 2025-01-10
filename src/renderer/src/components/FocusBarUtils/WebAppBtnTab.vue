<template>
  <button class="glass-btn" :style="cstyle" @click="onAppClick">
    <img :src="iconImg" />
  </button>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { useWebAppStore } from "../../stores/WebAppsStores";
import { useWinBasicStore } from "../../stores/basicInfo";


const prop = defineProps({
  data: Object,
});
const WinBasic = useWinBasicStore();
const WebAppStore = useWebAppStore();

import chatgpt from "../../assets/webapp-icon/chatgpt.png"
import figma from "../../assets/webapp-icon/figma.png"
import github from "../../assets/webapp-icon/github.png"
import google from "../../assets/webapp-icon/google.png"
import YTMusic from "../../assets/webapp-icon/yt-music.png"
import youtube from "../../assets/webapp-icon/youtube.png"
const iconImg = ref()

 if (prop.data.iconType  === "internal"){
  // iconImg.value = require(`../../assets/webapp-icon${prop.data.iconSrc}`)
  switch (prop.data.name) {
    case "ChatGPT":
      iconImg.value = chatgpt;
      break;
    case "YouTube Music":
      iconImg.value = YTMusic;
      break;
    case "Figma":
      iconImg.value = figma;
      break;
    case "GitHub":
      iconImg.value = github;
      break;
    case "YouTube":
      iconImg.value = youtube;
      break;
    case "Google":
      iconImg.value = google;
      break;
    default:
      iconImg.value = null; 
      }

 }

const isActive = computed(()=>{
  const ifExistTab = WinBasic.ScreenWindowTabs.includes(
    "WebView-" + prop.data.name
  );
 return ifExistTab

})




const onAppClick = () => {
  if (!isActive.value) {
    
    WebAppStore.AddToActiveWebAppList(prop.data);

    
    WinBasic.ChangeCurrentScreenWindow(WinBasic.ScreenWindowTabs.length);

  } else {
    const index = WinBasic.GetIndexCurrentScreenWindow(
      "WebView-" + prop.data.name
    );
    WinBasic.ChangeCurrentScreenWindow(index);
  }
};

const cstyle = computed(() => {
  return isActive.value
    ? "background: rgba(210, 15, 57,.4);"
    : "background: rgba(255, 255, 255, 0.1);";
});
</script>

<style scoped>
.glass-btn {
  height: 22px;
  width: 22px;

  backdrop-filter: blur(8px);
  border-radius: 5px;
  border: none;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.glass-btn img {
  height: 20px;
}
.glass-btn::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 5px;
  padding: 2px;
  background: linear-gradient(45deg, #4fd1c5, #9f7aea);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: opacity 0.2s;
}

.glass-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.glass-btn:active {
  outline: none;
  transform: translateY(1px);
  background: rgba(255, 255, 255, 0.05);
}

.glass-btn:hover::before {
  opacity: 0.8;
}

.glass-btn:active::before {
  outline: none;
  opacity: 1;
}
</style>
