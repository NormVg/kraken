<template>
  <button class="glass-btn" :style="cstyle" @click="onAppClick">
    <img :src="prop.data.iconSrc" />
  </button>
</template>

<script setup>
import { computed, ref ,watch} from "vue";
import { useWebAppStore } from "../../stores/WebAppsStores";
import { useWinBasicStore } from "../../stores/basicInfo";

const prop = defineProps({
  data: Object,
});
const WinBasic = useWinBasicStore();
const WebAppStore = useWebAppStore();

const isActive = ref(false);

watch(WinBasic.ScreenWindowTabs,()=>{
  
  const ifExistTab = WinBasic.ScreenWindowTabs.includes("WebView-" + prop.data.name)
  if (isActive && !ifExistTab){
    WebAppStore.RemoveActiveFromWebAppList({"name":"WebView-" + prop.data.name})
    
    isActive.value = false
  }

})

const onAppClick = () => {
  if (!isActive.value) {
    WebAppStore.AddToActiveWebAppList(prop.data);
    
    isActive.value = true;

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
    ? "background: rgba(210, 15, 57,.2);"
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
