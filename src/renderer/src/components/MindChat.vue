<script setup>
import { computed, onMounted, ref, watch } from "vue";

import "../assets/markdown.css";
import { useTextareaAutosize } from "@vueuse/core";
import MindDropDown from "./MindComponent/MindDropDown.vue";
import EntrBtn from "../assets/icons/enter.png";
import MindHistory from "./MindComponent/MindHistory.vue";
import MindChatComp from "./MindComponent/MindChatComp.vue";


import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { useAiChatStore } from "../stores/AiChatStore";
import MindNewChat from "./MindComponent/MindNewChat.vue";


const { textarea, input } = useTextareaAutosize();


import { appendMessage, CreateNewChat, setChatName, getChatName } from "../utils/AiChatManager.js"


const scrollToBottom = () => {

  const div = document.getElementById("chat-box-area");
  div.scrollTop = div.scrollHeight;

}
const GOOGLE_GENERATIVE_AI_API_KEY = ref("")

window.electron.ipcRenderer.send("read-db", "apiKey");
window.electron.ipcRenderer.on("read-db-reply-apiKey", (e, r) => {
  console.log(r[0].key);

  // GOOGLE_GENERATIVE_AI_API_KEY = r[0].key;
  GOOGLE_GENERATIVE_AI_API_KEY.value = r[0].key;
});


const google = computed(() => {
 return  createGoogleGenerativeAI({
    apiKey: GOOGLE_GENERATIVE_AI_API_KEY.value,
  })
});




const AIChatStore = useAiChatStore()

const GetAIresp = async () => {


    if (input.value === "") {
      return;

    }


  if (AIChatStore.CurrentChatID === undefined) {


    const data = await CreateNewChat()
    AIChatStore.setCurrentChatID(data.id)
    AIChatStore.updateChatHistory()
  }







  if (!AIChatStore.isAIWorking) {


    const userText = input.value;
    AIChatStore.setLoadingModel(true)
    AIChatStore.appendToCurrentChatMessages({ role: 'user', content: userText });



    input.value = '';
    console.log(AIChatStore.currentModel)

    const result = streamText({
      model: google.value(AIChatStore.currentModel),
      messages: AIChatStore.CurrentChatMessages,
    });

    scrollToBottom()
    await processStreaming(result);

    const chatidC = AIChatStore.CurrentChatID
    console.log(chatidC)

    const nameis = await getChatName(chatidC)
    if (nameis === "Kraken Chat") {

      await setChatName(chatidC, userText)
      AIChatStore.updateChatHistory()

    }

    await appendMessage(chatidC, userText, "user")



  }

}


onMounted(() => {
  AIChatStore.updateChatHistory()

  document.getElementsByClassName("resize-none")[0].addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      GetAIresp();
    }
    });
  });




async function processStreaming(result) {
  let botResponse = "";

  AIChatStore.setIsAIWorking(true)
  AIChatStore.setLoadingModel(false)

  AIChatStore.appendToCurrentChatMessages({ role: "assistant", content: "" })
  for await (const delta of result.textStream) {
    scrollToBottom()

    botResponse += delta;
    var message = AIChatStore.CurrentChatMessages
    message[message.length - 1].content = botResponse;
    AIChatStore.setCurrentChatMessages(message)

    console.log(message);
  }
  appendMessage(AIChatStore.CurrentChatID, botResponse, "assistant").then(() => {
    console.log("Message appended successfully!");
  })
  AIChatStore.setIsAIWorking(false)
}


</script>

<template>
  <div className="mind-view-box ">
    <div id="mind-box">
      <div id="mind-chat">
        <div id="chat-box">
          <MindChatComp />
        </div>

        <div id="chat-inp">
          <textarea ref="textarea" v-model="input" class="resize-none" placeholder="What's on your mind?" rows="1"  />

          <button @click="GetAIresp" id="send">
            <img v-if="!AIChatStore.isAIWorking" :src="EntrBtn" alt="" />
            <div v-else class="loader"></div>
          </button>
        </div>
      </div>
      <div id="mind-bar">
        <MindNewChat />
        <MindDropDown />
        <MindHistory />
      </div>
    </div>
  </div>
</template>

<style scoped>
.resize-none {
  resize: none;
  /* border: 1px solid red; */
  min-height: 30px;
}

#chat-box {
  width: 100%;
}

button img {
  height: 40px;
  width: 40px;
}

button {
  border: none;
  background: none;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

button:active {
  background: rgba(245, 245, 245, 0.244);
}

#chat-inp {
  /* border: 1px solid red; */
  transition: all 1s ease-in-out;

  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border-radius: 10px;
  background-color: #0a0d18;
  /* margin: 0% auto; */
  /* bottom: 20px; */
  animation: MoveBar 1s ease-out forwards;
  /* padding-left: 10px;
  padding-right: 10px; */
  padding: 5px 10px;

  position: absolute;
  bottom: 12%;
  left: 25%;
  transform: translateX(-25%);
}

#mind-chat {
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
  font-family: "Alef", sans-serif;
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
  background: #ff5f5f10;
}

#mind-bar {
  background-color: #0a0d18;
  /* width: 25%; */
  width: max(25%, 300px);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid red; */
  padding-top: 50px;
}

#mind-chat {
  width: 100%;
  height: 100%;
  /* background-color: #1C1C2A; */
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
