<script setup>
import FocusBarTab from "./FocusBarUtils/FocusBarTab.vue";
import FocusBarScroolShift from "./FocusBarUtils/FocusBarScroolShift.vue";
import FocusBarToolsSideBar from "./FocusBarUtils/FocusBarToolsSideBar.vue";
</script>

<template>
  <div id="focus-bar">
    <div id="focus-win-scroll-switch">
      <FocusBarScroolShift />
    </div>

    <div id="focus-tabs">
      <FocusBarTab />
      <FocusBarTab />
      <FocusBarTab />
      <FocusBarTab />
      <FocusBarTab />
    </div>
    <div id="focus-tools">
        <!-- <FocusBarToolsDotBtn/>
        <FocusBarHome/>
        <FocusBarToolsTerminal/>
        <FocusBarToolsFolder/> -->
        <FocusBarToolsSideBar/>
      </div>
  </div>
</template>

<style scoped>
#focus-bar {
  width: calc(100% - 50px);
  height: 30px;
  border-radius: 7px;
  background-color: #0a0d18;
  border: 1px solid #71738e;
  position: fixed;
  color: white;
  bottom: 30px;
  align-self: center;
  justify-self: center;
  left: 25px;
  right: 25px;

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0px 10px;
  gap: 10px;
  z-index: 15;
  transition: 350ms ease-in-out;
}

#focus-tools{
    display: flex;
    align-items: center;
    /* border: 1px solid red; */
    gap: 5px;
    border-right: 1px solid #FFFFFF;
    /* border-left: 1px solid #FFFFFF; */
    /* padding-left: 5px ; */
    padding-right: 10px;
    margin-left: auto;

}
#focus-tools{
    border: none;
    /* border: 1px solid red; */
}

</style>
