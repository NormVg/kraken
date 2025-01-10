<template>
  <div className="side-app-view-box ">
    <div>
      <webview
        src="https://google.com"
        allowpopups="true"
      ></webview>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.side-app-view-box {
  /* background-image: url("../assets//banner.png"); */
  height: 100%;

  border: 2px solid #c499db;
  border-radius: 10px;
  /* width: calc(100% - 50px); */
width: 90%;
  overflow: hidden;
  /* margin-right: 25px;
  margin-left: 25px; */
  /* 
  background-repeat: no-repeat;
  background-position: center; */
  background-color: #0a0d1877;
  /* background-size: 250px; */

  -webkit-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
  -moz-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
  box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);

  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.side-app-view-box div {
  height: 100%;
  width: 100%;
}

.side-app-view-box div webview {
  height: 100%;
  width: 100%;
}
</style>
