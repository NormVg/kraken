<script setup>
import { onMounted, ref, watch } from "vue";
import { useWebAppStore } from "../stores/WebAppsStores";
import { useWinBasicStore } from "../stores/basicInfo";

import VueMarkdown from "vue-markdown-render";
import "../assets/markdown.css";
import { useTextareaAutosize } from "@vueuse/core";

const skippedFirstScroll = ref(false);

const { textarea, input } = useTextareaAutosize();

onMounted(() => {});

const ChatList = ref([
  {
    text: "Hello! How can I assist you today?",
    type: "bot",
  },
  {
    text: "I need some help with my order.",
    type: "user",
  },
  {
    text: "Sure! Can you provide your order ID?",
    type: "bot",
  },
  {
    text: "It’s #123456.",
    type: "user",
  },
  {
    text: "Thanks! Your order is on the way and should arrive by tomorrow.",
    type: "bot",
  },
  {
    text: "Great! Can I change the delivery address?",
    type: "user",
  },
  {
    text: "Unfortunately, the order has already been dispatched, so the address cannot be changed.",
    type: "bot",
  },
]);

const scrollToBottom = () => {
  setTimeout(() => {
    if (skippedFirstScroll.value) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      skippedFirstScroll.value = true;
    }
  }, 100);
};

watch(ChatList, scrollToBottom);
</script>

<template>
  <div className="mind-view-box ">
    <div id="mind-box">
      <div id="mind-chat">

        <div id="chat-box">

        </div>

        <div id="chat-inp">

            <textarea
            ref="textarea"
            v-model="input"
            class="resize-none"
            placeholder="What's on your mind?"
            />I
        </div>
      </div>
      <div id="mind-bar"></div>
    </div>
  </div>
</template>

<style scoped>


#chat-box{
    border: 1px solid red;

}

#chat-inp{
border: 1px solid red;
transition: all 1s ease-in-out;
  
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border-radius: 10px;
  background-color: #161c2e;
  /* margin: 0% auto; */
  /* bottom: 20px; */
  animation: MoveBar 1s ease-out forwards;
  padding-left: 3px;
}

#mind-chat{
    display: flex;
    justify-items: center;
    align-items: center;
    
}

textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;



  max-height: 200px;
  overflow-y: scroll;
  height: 20px;
  min-height: 20px;
  resize: vertical;
  font-size: 15px;
  width: 90%;
  background: none;
  border: none;
  color: #d7c2be;
  padding: 5px 10px;
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  transition: width ease-in-out 400ms;

}

textarea:focus {
  outline: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

#mind-box {
  height: 100%;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
}
#mind-bar {
  background-color: red;
  width: 20%;
  height: 100%;
}

#mind-chat {
  width: 100%;
  height: 100%;
  background-color: #c499db;
}

.mind-view-box {
  /* background-image: url("../assets//banner.png"); */
  height: 85vh;

  border: 2px solid #c499db;
  border-radius: 7px;
  width: calc(100% - 30px);

  overflow: hidden;
  margin-right: 15px;
  margin-left: 15px;
  /* 
    background-repeat: no-repeat;
    background-position: center; */
  background-color: #0a0d1877;
  /* background-size: 250px; */
  /*   
    -webkit-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
    -moz-box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1);
    box-shadow: inset 0px 0px 30px -7px rgba(145, 210, 217, 1); */

  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.markdown-content {
  font-family: "Alef", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #d7c2be;
  background: none !important;
  margin-bottom: 10vh !important;
}
</style>
