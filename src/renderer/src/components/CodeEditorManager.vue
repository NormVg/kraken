<script setup>
import { ref } from "vue";
import CodeEditor from "./CodeEditor.vue";
import Tab from "./Tab.vue";
import TabManager from "./TabManager.vue";

const activeTab = ref(0);
const TabsAll = ref([]);

const updateTabsAll = (val) => {
  TabsAll.value = val;
};
</script>

<template>
  <!-- <input type="number" v-model="activeTab"> -->
  <TabManager :currentTab="activeTab" :updateTabsList="updateTabsAll">
    <Tab WinID="id-1" cstyle="height: 100%;width:100%;">
      <CodeEditor />
    </Tab>

    <Tab WinID="id-2" cstyle="height: 100%;width:100%;">
      <CodeEditor />
    </Tab>
  </TabManager>
</template>
