<template>
  <div class="chat-container">
    <div ref="messagesContainer" class="messages-list">
      <div v-for="(messages, label) in groupedMessages" :key="label" class="date-section">
        <p class="date">{{ label }}</p>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message"

          @click="AIChatStore.switchChatMessages(msg.id)"
        >
          {{ msg.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {  formatISO } from "date-fns";
import { useAiChatStore } from "../../stores/AiChatStore.js";



const AIChatStore = useAiChatStore()

const messages = ref([])
const messagesContainer = ref(null);


const groupedMessages = computed(() => {
  const today = formatISO(new Date(), { representation: "date" });
  const grouped = { Today: [], Later: [] };

  AIChatStore.ChatHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((msg) => {
    const msgDate = formatISO(new Date(msg.date), { representation: "date" });

    if (msgDate === today) {
      grouped.Today.push(msg);
    } else {
      grouped.Later.push(msg);
    }
  });

  return grouped;
});



const scrollToTop = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = 0;
  }
};

onMounted((scrollToTop));


watch(messages, scrollToTop, { deep: true });


</script>

<style scoped>
.chat-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-family: "JetBrains Mono", monospace;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.messages-list {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #555 #1a1a20;
  margin: 10px;
}

.messages-list::-webkit-scrollbar {
  width: 6px;
}

.messages-list::-webkit-scrollbar-track {
  background: #1a1a20;
  border-radius: 10px;
}

.messages-list::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 10px;
}



.date-section {
  margin-bottom: 10px;
  font-family: "JetBrains Mono", monospace;
}

.date {
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
}

.message {
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 4px;
  /* background: #222; */
  transition: all 0.3s ease-in-out;
  width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Hover effect - subtle glow */
.message:hover {
  /* background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
  cursor: pointer; */
  background-color: #ff5f5f30;
}

/* Active effect - pressed look */
.message:active {
  background-color: #ff5f5f50;
}
</style>
