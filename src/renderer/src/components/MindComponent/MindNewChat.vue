<template>
  <button class="new-chat-btn" @click="ClickNewChat">New Chat</button>
</template>

<script setup>
import { onMounted } from "vue";
import { useAiChatStore } from "../../stores/AiChatStore.js";
import {CreateNewChat} from "../../utils/AiChatManager.js"

const AiChatStore = useAiChatStore()

const ClickNewChat = async () => {



const data = await CreateNewChat()
AiChatStore.setCurrentChatID(data.id)
AiChatStore.updateChatHistory()
AiChatStore.switchChatMessages(data.id)

}


// CreateNewChat().then((data) => {
//   console.log(data)







// })






</script>

<style scoped>
.new-chat-btn {



  background-color: #222A40;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 210px;
  height: 40px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
  font-family: "JetBrains Mono", monospace;

}

.new-chat-btn:hover{
  background-color: #ff5f5f30;
}
</style>
