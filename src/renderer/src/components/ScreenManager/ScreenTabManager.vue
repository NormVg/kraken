<script setup >
import { provide, ref, computed, watch } from 'vue';

const props = defineProps({
  currentTab: Number,
  updateTabsList: Function
})

const previousTab = ref(props.currentTab);
const TabNow = computed(() => props.currentTab);
const TabList = ref([]);

watch(() => props.currentTab, (newVal, oldVal) => {
  previousTab.value = oldVal;
});

const removeTab = (tab) => {
  TabList.value = TabList.value.filter(t => t !== tab);
  if (props.updateTabsList) {
    props.updateTabsList(TabList.value);
  }
};

const registerTab = (tab) => {
  console.log(tab)
  if (!TabList.value.includes(tab)) {
    TabList.value.push(tab);
    if (props.updateTabsList) {
      props.updateTabsList(TabList.value);
    }
  }
};

provide("screen-tab-manager", {
  TabNow,
  previousTab,
  TabList,
  registerTab,
  removeTab,
});
</script>

<template>
  <div class="tab-manager">
    <slot></slot>
  </div>
</template>

<style scoped>
.tab-manager {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>