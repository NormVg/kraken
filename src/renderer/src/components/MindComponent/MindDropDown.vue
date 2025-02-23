<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import getAiModelList from "../../utils/getAiModelList.js";
import dropIcon from "../../assets/icons/dropd.svg";
import { useAiChatStore } from "../../stores/AiChatStore.js";

const isOpen = ref(false);
const dropdown = ref(null);
const dropdownButton = ref(null);
const dropdownWidth = ref(0);

const modelList = getAiModelList();
// const currentModel = ref(modelList[0]);

const options = [...modelList];




const AIChatStore =  useAiChatStore()

AIChatStore.setCurrentModel("gemini-2.0-flash-exp")

const toggleDropdown = (event) => {
  isOpen.value = !isOpen.value;
  event.stopPropagation();

  nextTick(() => {
    if (dropdownButton.value) {
      dropdownWidth.value = dropdownButton.value.offsetWidth;
    }
  });
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  if (dropdownButton.value) {
    dropdownWidth.value = dropdownButton.value.offsetWidth;
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const selectOption = (option) => {
  console.log("Selected:", option);
  // currentModel.value = option;
  AIChatStore.setCurrentModel(option)
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown" ref="dropdown">
    <!-- Dropdown button -->
    <button @click="toggleDropdown" class="dropdown-button" ref="dropdownButton">
      <span class="dropdown-text">{{ AIChatStore.currentModel }}</span>
      <span :class="isOpen ? 'arrow-up' : 'arrow-down'">
        <img :src="dropIcon" />
      </span>
    </button>

    <!-- Dropdown Container -->
    <div v-if="isOpen" class="dropdown-container" :style="{ width: dropdownWidth + 'px' }">
      <div class="dropdown-menu">
        <div v-for="option in options" :key="option" class="dropdown-item" @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dropdown container */
*{
  font-family: "JetBrains Mono", monospace;
}
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown button */
.dropdown-button {
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
}
.dropdown-button:hover{
  background-color: #ff5f5f30;
}
/* Ensure text is clipped */
.dropdown-text {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Arrow animation */
.arrow-down {
  transition: transform 0.2s ease;
}

.arrow-up {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}

/* Parent container with border-radius */
.dropdown-container {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #222A40;
  color: white;
  margin-top: 5px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* Dropdown menu (Scrollable area inside parent) */
.dropdown-menu {
  max-height: 250px;
  overflow-y: auto;
  padding: 5px 0;
}

/* Hide scrollbar */
.dropdown-menu::-webkit-scrollbar {
  display: none;
}

/* Dropdown items */
.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background-color: #ff5f5f30;
}
</style>
