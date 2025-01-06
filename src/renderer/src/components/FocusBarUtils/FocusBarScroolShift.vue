<template>
  <div id="focus-bar-scroll-shift" @mousewheel="myMouseScroll">
    <div id="focus-bar-long"><div :style="BallStyle" id="focus-bar-ball"></div></div>
    <!-- style={{marginLeft:Fbc.ScrollShiftValue}} -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWinBasicStore } from "../../stores/basicInfo";

const WinBasic = useWinBasicStore();

const BallStyle  = computed(()=>{
  return `margin-left: ${WinBasic.ScroolShiftPos}px;`
  
})

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const myMouseScroll = debounce((e) => {
  console.log(e);

  if (e.deltaY < 0) {
    WinBasic.PrevCurrentScreenWindow();
    console.log("scrolling left");
  } else if (e.deltaY > 0) {
    console.log("scrolling right");
    WinBasic.NextCurrentScreenWindow();
  }
}, 70);
</script>

<style scoped>
#focus-bar-scroll-shift {
  width: 75px;
  height: 25px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#focus-bar-long {
  width: 75px;
  height: 10px;
  background-color: #71738e;
  border-radius: 3px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

#focus-bar-ball {
  height: 20px;
  width: 20px;
  border-radius: 50px;
  background-color: #71738e;
  position: fixed;
  /* margin-left: 55px; */
  /* margin-left: 65px; */
  transition: all ease-in-out 200ms;
  margin-left: 0px;
}
</style>
