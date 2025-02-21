<script setup>
import { watch, ref } from 'vue'

import { useTextareaAutosize } from "@vueuse/core";

const { textarea, input } = useTextareaAutosize();

function createJsonResponse(rawResponse) {
  // Split the raw response at the first space to get the type and the rest as the text
  const [type, ...textParts] = rawResponse.split(' ')
  const text = textParts.join(' ') // Rejoin the rest to form the full text

  return {
    type: type,
    text: text,
  }
}

async function onQuestionAsk() {
//   if (questionInput.value !== '') {
//     if (!ChatStore.isChatOpened) {
//       setAIChatScreen()
//     }

//     const userText = questionInput.value

//     ChatData.Add2ChatList(userText, true)
//     ChatStore.ProcessingAi = true

//     questionInput.value = ''
//     AiAnswer.value = await CallAPI(userText)
//     console.log(AiAnswer.value)
//     ChatData.Add2ChatList(AiAnswer.value, false)
//     ChatStore.ProcessingAi = false
//   }
}

const toolType = ref('nan')

const SetToolFunction = (type) => {
  if (type === toolType.value) {
    toolType.value = 'nan'
    return
  }
  if ('tool-file' == type) {
    toolType.value = 'tool-file'
  } else if ('tool-web' == type) {
    toolType.value = 'tool-web'
  } else if ('tool-x' == type) {
    toolType.value = 'tool-x'
  }
}
</script>

<template>
  <div id="inp-box-small">

    <textarea
      
      
      name="Text1"

      placeholder="Ask for precision..."
      @keydown.enter="onQuestionAsk"
      

      ref="textarea"
      v-model="input"
      class="resize-none"
      
    ></textarea>
    <button @click="onQuestionAsk">
      
       <img :src="EnterBtn" alt="Enter" />
    </button>
  </div>
</template>

<style scoped>

#inp-box-small {
  transition: all 1s ease-in-out;
  border: #828a9c 1px solid;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border-radius: 10px;
  background-color: #161c2e;
  /* margin: 0% auto; */
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  /* bottom: 20px; */
  animation: MoveBar 1s ease-out forwards;
  padding-left: 3px;
}

@keyframes MoveBar {
  from {
    bottom: 0vh;
  }
  to {
    bottom: 10vh;
  }
}
textarea:focus {
  outline: none;
}

textarea {
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

button {
  background: none;
  border: none;
  transition: all ease-in-out 400ms;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  height: 45px;
  width: 45px;
}
img {
  height: 45px;
  width: 45px;
}
button:hover {
  background-color: #101524;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */

  #inp-box {
    width: 85vw;
  }

  #inp-box-small {
    width: 85vw;
    animation: MoveBar 1s ease-out forwards;
  }

  @keyframes MoveBar {
    from {
      top: 50vh;
    }
    to {
      top: 84vh;
    }
  }
}

.cc1-leave-from {
  opacity: 1;
}
.cc1-leave-to {
  opacity: 0;
}
.cc1-leave-active {
  transition: all ease-in-out 400ms;
}
</style>