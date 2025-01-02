import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatDataStore = defineStore('ai-chat-data', () => {
  const ChatList = ref([])

  const Add2ChatList = (text, byMan) => {
    ChatList.value.push({ text: text, byMan: byMan })
  }
  return { ChatList, Add2ChatList }
})