<script setup>
import { computed, inject, onMounted, onUnmounted,watch } from 'vue';
import SlideTransition from "./SlideTransition.vue";
import { useWinBasicStore } from '../../stores/basicInfo';


const props = defineProps({
  WinID: String,
  cstyle: String,
})




const { TabNow, previousTab, TabList, registerTab, removeTab } = inject('screen-tab-manager', {
  TabNow: { value: 0 },
  previousTab: { value: 0 },
  TabList: { value: [] },
  registerTab: () => {},
  removeTab: () => {},
}) ;

onMounted(() => {
  registerTab(props.WinID);
});

onUnmounted(() => {
  removeTab(props.WinID);
});

const isActive = computed(() => {
  const index = TabList.value.indexOf(props.WinID);
  return index === TabNow.value;
});

const WinBasic = useWinBasicStore()

watch(isActive,()=>{
  if (isActive.value){
  
  if (props.WinID.includes("WebView")){

    WinBasic.ChangeIsMiddleBar(true)
    
    WinBasic.ChangeTitle(props.WinID.replace("WebView-",""))
  }else if (props.WinID.includes("code-editor-one")){
    WinBasic.ChangeIsMiddleBar(false)
    if (WinBasic.CodeEditorTab.length !== 0 ){
      const item = WinBasic.CodeEditorTab[WinBasic.ActiveCodeEditorTab]
      WinBasic.ChangeTitle(item.name)


    }else{
      WinBasic.ChangeTitle("Kraken")
    }
  }
  else{
    WinBasic.ChangeIsMiddleBar(false)
  }

}
})



const slideDirection = computed(() => {
  const currentIndex = TabList.value.indexOf(props.WinID);
  return TabNow.value > previousTab.value ? 'right' : 'left';
});
</script>

<template>
  <SlideTransition
    :direction="slideDirection"
    :active="isActive"
  >
    <div class="tab-content" :style="cstyle">
      <slot></slot>
    </div>
  </SlideTransition>
</template>

<style scoped>
.tab-content {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>