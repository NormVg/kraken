import { ref } from 'vue'
import { defineStore } from 'pinia'
import {ListAllChat,readChat}  from "../utils/AiChatManager.js"

export const useAiChatStore = defineStore('ai-chat-store', () => {
    const currentModel = ref('')
    const CurrentChatMessages = ref([])
    const ChatHistory = ref([])
    const CurrentChatID = ref(undefined)


    function setCurrentChatID(params) {
      CurrentChatID.value = params
    }

    const isAIWorking = ref(false);
    const loadingModel = ref(false);




    function setIsAIWorking(status) {
      isAIWorking.value = status;
    }

    function setLoadingModel(status) {
      loadingModel.value = status;
    }





    function setCurrentModel(model) {
      currentModel.value = model
    }

    function appendToCurrentChatMessages(message) {


      CurrentChatMessages.value.push(message)
      // console.log(CurrentChatID.value,message.content,message.role)



    }

    function setCurrentChatMessages(messages) {
      CurrentChatMessages.value = messages
    }

    function appendToChatHistory(history) {
      ChatHistory.value.push(history)
    }

    function setChatHistory(history) {
      ChatHistory.value = history
    }

    function updateChatHistory() {

      ChatHistory.value = []
      ListAllChat().then((data) => {

        data.forEach((element) => {

          // console.log(element,"asd")
          readChat(element).then((ddata) => {
            // console.log(ddata)

            ChatHistory.value.push({ text: ddata.name, date: ddata.date,id:ddata.id })
          })
        });

      })

    }

    function switchChatMessages(chatID) {
      readChat(chatID).then((data) => {
        // console.log(data)
        CurrentChatMessages.value = data.history.reverse();
        CurrentChatID.value = chatID

      })
    }


  return {
    currentModel,CurrentChatMessages,ChatHistory,
    switchChatMessages,
    setCurrentChatMessages,
    setChatHistory,
    appendToChatHistory,
    appendToCurrentChatMessages,
    setCurrentModel,

    setIsAIWorking,isAIWorking,
    setLoadingModel,loadingModel,

    setCurrentChatID,CurrentChatID,
    updateChatHistory
   }
})
