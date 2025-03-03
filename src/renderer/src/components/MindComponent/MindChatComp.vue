<script setup>
import MarkdownItAnchor from 'markdown-it-anchor';
import VueMarkdown from 'vue-markdown-render'
import '../../assets/markdown.css'
import { useAiChatStore } from '../../stores/AiChatStore'
import CoptBtnIcon from '../../assets/icons/copy_btn.png'

const AIChatStore = useAiChatStore()
const plugins = [MarkdownItAnchor];







const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
};


</script>


<template>
  <div id="chat-box-area">

    <div v-for="chatText in AIChatStore.CurrentChatMessages" :key="chatText"
      :class="chatText.role === 'user' ? 'text-by-man' : 'text-by-ai'">

      <span v-if="chatText.role === 'assistant'" class="markdown-content">


        <VueMarkdown :source="chatText.content" :plugins="plugins" />

        <!-- {{ chatText.content }} -->


      </span>

      <span v-else class="markdown-content">
        <VueMarkdown :source="chatText.content" :plugins="plugins" />
        <!-- {{ chatText.content }} -->


      </span>



      <div v-if="chatText.role === 'assistant'" id="copy-btn">
        <span @click="copyText(chatText.content)">
          <img :src="CoptBtnIcon" alt="">
        </span>
      </div>
    </div>
    <div v-if="AIChatStore.loadingModel" class="text-by-ai">
      <div class="loader"></div>
    </div>
  </div>
</template>



<style scoped>

#copy-btn{
  display: flex;
  justify-content: flex-start;
  margin: 10px;
  transition: all ease-in-out 200ms;
}

#copy-btn img:hover {
  opacity: 0.5;
  scale: 1.1;
}

#copy-btn:active {
  opacity: 0.5;

}
#copy-btn img{
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.markdown-content {
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: whitesmoke;
  background: none !important;
  margin-bottom: 10vh !important;
  user-select: text;
}

.text-by-ai {
  padding: 10px;
  margin: 5px;
  margin-bottom: 10px;
  transition: all 1s ease-in-out;
  /* border: #828a9c 1px solid; */
  border-radius: 10px;
  background-color: #37405e7d;
  align-self: flex-start;
  max-width: 65vw;
  animation: slideInFromLeft 1s forwards;
  color: #d7c2be;
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  word-wrap: break-word;
}

.text-by-man {
  word-wrap: break-word;
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: whitesmoke;
  max-width: 65vw;
  padding: 10px;

  margin: 5px;
  transition: all 1s ease-in-out;
  /* border: #828a9c 1px solid; */
  border-radius: 10px;
  background-color: #37405E;
  align-self: flex-end;
  animation: slideOutToRight 1s forwards;
  user-select: text;
}

#chat-box-area {
  font-family: 'Alef', sans-serif;
  font-weight: 400;
  font-style: normal;
  overflow-x: hidden;

  /* min-height: 70vh; */
  max-height: 60vh;
  width: 100%;

  transition: all 1s ease-in-out;

  display: flex;
  /* align-items: center; */
  justify-content: start;
  flex-direction: column;
  /* border-radius: 10px; */
  /* background-color: #161c2e; */
  margin: 0% auto;
  margin-top: 3vh;
  /* margin-bottom: 18vh; */
  margin-bottom: 10vh;
  padding-bottom: 8vh;
  z-index: 10;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Keyframes for exiting to the right */
@keyframes slideOutToRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
