<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  direction: 'left' | 'right';
  active: boolean;
}>();

const transitionName = computed(() => props.direction);
</script>

<template>
  <Transition :name="transitionName" mode="out-in">
    <!-- <slot v-if="active"></slot> -->
    

    <div v-show="active" class="slide-content">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.slide-content {
  position: absolute;
  width: 100%;
  height: 100%;
}


.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: transform 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.right-enter-from {
  transform: translateX(100%);
}

.right-leave-to {
  transform: translateX(-100%);
}

.left-enter-from {
  transform: translateX(-100%);
}

.left-leave-to {
  transform: translateX(100%);
}
</style>