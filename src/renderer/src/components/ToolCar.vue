<template>
  <div id="side-car-box">
    <SideBarWeb />
    <SideTerminal />
  </div>
</template>

<script setup>
import SideTerminal from "./SideBarTools/SideTerminal.vue";
import SideBarWeb from "./SideBarTools/SideBarWeb.vue";
</script>

<style scoped>
#side-car-box {
  height: 88vh;
  width: 100%;

  overflow-y: scroll;
  padding-top: 10px;

  display: inline-grid;

  gap: 20px;
}

#side-car-box::-webkit-scrollbar {
  width: 10px;
}
</style>
