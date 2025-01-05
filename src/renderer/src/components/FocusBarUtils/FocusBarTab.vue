<template>
  <div id="focus-bar-tab">
    {{ prop.name }}

    <span><img :src="closeBtn" /></span>
  </div>
</template>

<script setup>
import closeBtn from "../../assets/icons/close.png";

const prop = defineProps({
  name: {
    typeof: String,
    default: "Tab UI Comp",
  },
});
</script>

<style>
#focus-bar-tab > span > img {
  height: 12px;
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 2px;
  transition: all ease-in-out 100ms;
}
#focus-bar-tab > span > img:hover {
  /* border: 1px solid #272A29; */
  background-color: #272a29;
  border-radius: 3px;
}
#focus-bar-tab {
  height: 22px;
  background-color: #272a29;
  border-radius: 5px;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all ease-in-out 200ms;
  font-size: 14px;
}

#focus-bar-tab:hover {
  
  background-color: #53556e;
}

#focus-tabs {
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  gap: 5px;
  border-right: 1px solid #ffffff;
  /* border-left: 1px solid #FFFFFF; */
  /* padding-left: 5px ; */
  padding-right: 10px;
}
</style>
