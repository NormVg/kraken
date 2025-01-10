<script setup>
import {watch, ref } from "vue";
import CodeEditor from "./CodeEditor.vue";
import Tab from "./Tab.vue";
import TabManager from "./TabManager.vue";

import { useWinBasicStore } from "../stores/basicInfo";




const WinBasic =  useWinBasicStore()

const activeTab = ref(0);
const TabsAll = ref([]);

const updateTabsAll = (val) => {
  TabsAll.value = val;
  console.log(TabsAll.value)
};



</script>

<template>
 
  <TabManager :currentTab="WinBasic.ActiveCodeEditorTab" :updateTabsList="updateTabsAll">

    <Tab :WinID="win.name+'-id-'+win.path" v-for="win in WinBasic.CodeEditorTab" :key="win" cstyle="height: 100%;width:100%;">
      <CodeEditor :path="win.path" />
    </Tab>


  </TabManager>
</template>
