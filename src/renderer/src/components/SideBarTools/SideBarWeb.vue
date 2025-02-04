<template>
  <div id="side-web-box">
    <div id="side-web-control">
      <input type="text" v-model="srcURL"  @keyup.enter="urlSubmit" placeholder="URL" />

      <button><img :src="Rleft" @click="goBack" /></button>
      <button><img :src="Rreload" @click="goReload" /></button>
      <button><img :src="Rright" @click="goForward" /></button>

      <!-- <button @click="CloseWebTab"><img :src="Rclose" /></button> -->
    </div>
    <div className="side-app-view-box ">
      <div>
        <webview
        useragent="Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Mobile Safari/537.36"
          id="side-web-tab"
          src="https://google.com"
          allowpopups="true"
        ></webview>
      </div>
    </div>
  </div>
</template>

<script setup>
import Rleft from "../../assets/icons/relay-left.png";
import Rright from "../../assets/icons/relay-right.png";
import Rreload from "../../assets/icons/relay-reload.png";
import { onMounted, ref } from "vue";

const srcURL = ref()

const urlSubmit = ()=>{
  var webview = document.getElementById("side-web-tab");
  
  webview.src = srcURL.value
}

const goBack = () => {
  var webview = document.getElementById("side-web-tab");

  if (webview.canGoBack()) {
    webview.goBack();
  }
};

const goForward = () => {
  var webview = document.getElementById("side-web-tab");

  if (webview.canGoForward()) {
    webview.goForward();
  }
};

const goReload = () => {
  var webview = document.getElementById("side-web-tab");
  webview.reload();
};



onMounted(() => {
  const webview = document.getElementById("side-web-tab");

  webview.addEventListener("did-navigate", (event) => {
    srcURL.value = event.url;
    console.log("Side New URL (did-navigate):", event.url); // Triggered on main frame navigation
  });

  webview.addEventListener("did-navigate-in-page", (event) => {
    srcURL.value = event.url;
    console.log("Side New URL (did-navigate-in-page):", event.url); // Triggered on in-page navigation (e.g., hash changes)
  });
});
</script>

<style scoped>
/* #side-web-box{
  border: 1px solid whitesmoke;
} */

#side-web-control {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #1c1c2a;
  height: 25px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
  margin-left: auto;
  margin-right: auto;
  /* padding-bottom: 5px; */
}

button img {
  width: 20px;
  height: 20px;
  background: none;
}
button {
  background: none;
  border: none;
  border-radius: 5px;
  transition: all ease-in-out 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
button:active {
  outline: 1px solid #ececf1;
}
button:hover {
  background-color: #53556e;
  border: none;
}
input {
  border: none;
  background: none;
  color: #7a7a7a;
  border-radius: 5px;
  height: 20px;
  width: 100%;
  padding: 0px 10px;
}
input:hover {
  background-color: #323342;
}
input:focus {
  background-color: #2b2b41;
  /* outline: none; */
  outline: 1px solid #ececf1;
  color: #ececf1;
}

.side-app-view-box {
  background-image: url("../assets//banner.png");
  height: 80vh;

  border: 2px solid #c499db;
  border-radius: 10px;
  /* width: calc(100% - 50px); */
  width: 90%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  /* margin-right: 25px;
  margin-left: 25px; */

  background-repeat: no-repeat;
  background-position: center;
  background-color: #0a0d1877;
  background-size: 250px;

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
