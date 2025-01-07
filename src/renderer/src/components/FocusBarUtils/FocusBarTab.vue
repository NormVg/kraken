<template>
  <div id="focus-bar-tab" :style="cstyle" @click="switchToTab">
    {{ prop.name }}

    <span @click="closethisTab"><img :src="closeBtn" /></span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import closeBtn from "../../assets/icons/close.png";
import { useWinBasicStore } from "../../stores/basicInfo";

const prop = defineProps({
  name: {
    typeof: String,
    default: "Tab UI Comp",
  },
  path: {
    typeof: String,
    default: "Tab UI Comp",
  },
});

const WinBasic = useWinBasicStore()

const cstyle = computed(()=>{
  const isThis = WinBasic.CodeEditorTab[WinBasic.ActiveCodeEditorTab].path === prop.path
  return isThis ? "background-color: #53556e;" : "background-color: #272a29;"
})

const switchToTab = ()=>{
  if (WinBasic.CurrentScreenWindow !== 0){
    WinBasic.ChangeCurrentScreenWindow(0)
  }
  WinBasic.switchToCodeTab(prop)

}

const closethisTab=()=>{
  
    WinBasic.closeCodeTab(prop)
  
}

</script>

<style>
#focus-bar-tab > span > img {
  height: 13px;
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 2px;
  transition: all ease-in-out 100ms;
}
#focus-bar-tab > span > img:hover {
  background-color: #272a29;
  border-radius: 3px;
}
#focus-bar-tab {
  font-weight: 150;
  height: 22px;
  background-color: #272a29;
  border-radius: 5px;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all ease-in-out 200ms;
  font-size: 14px;
  /* text-overflow: ; */
  max-width: fit-content;
  white-space: nowrap;
}

#focus-bar-tab:hover {
  background-color: #53556e;
}

#focus-tabs {
  display: flex;
  align-items: center;

  gap: 5px;
  border-right: 1px solid #ffffff;

  padding-right: 10px;
}
</style>
