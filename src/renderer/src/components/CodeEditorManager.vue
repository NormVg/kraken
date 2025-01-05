<script setup>
import { ref } from "vue";
import CodeEditor from "./CodeEditor.vue";
import Tab from "./Tab.vue";
import TabManager from "./TabManager.vue";

import { useWinBasicStore } from "../stores/basicInfo";

const WinBasic =  useWinBasicStore()
// WinBasic.ActiveCodeEditorTab
const activeTab = ref(0);
const TabsAll = ref([]);

const updateTabsAll = (val) => {
  TabsAll.value = val;
};
</script>

<template>
  <!-- <input type="number" v-model="activeTab"> -->
  <TabManager :currentTab="WinBasic.ActiveCodeEditorTab" :updateTabsList="updateTabsAll">

    <Tab :WinID="win.name+'-id-'+win.path" v-for="win in WinBasic.CodeEditorTab" :key="win" cstyle="height: 100%;width:100%;">
      <CodeEditor :path="win.path" />
    </Tab>

    <!-- <Tab WinID="id-1" cstyle="height: 100%;width:100%;">
      <CodeEditor />
    </Tab>

    <Tab WinID="id-2" cstyle="height: 100%;width:100%;">
      <CodeEditor />
    </Tab>

    <Tab WinID="id-3" cstyle="height: 100%;width:100%;">
      <CodeEditor />
    </Tab> -->
  </TabManager>
</template>
