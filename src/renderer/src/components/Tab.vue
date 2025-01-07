<script setup>
import { computed, inject, onMounted, onUnmounted } from "vue";

const prop = defineProps({
  WinID: {},
  cstyle: {
    typeof: String,
    default: "",
  },
});

const { TabNow, TabList, registerTab, removeTab } = inject("tab-manager");

onMounted(() => {
  registerTab(prop.WinID);
  
});

onUnmounted(() => {
  removeTab(prop.WinID);
  
});

const isActive = computed(() => {
  return TabList.value.indexOf(prop.WinID) === TabNow.value
    ? prop.cstyle + "display:block;"
    : prop.cstyle + "display: none;";
});
</script>

<template>
  <div class="tab-manager-child" :style="isActive">
    <slot> </slot>
  </div>
</template>
