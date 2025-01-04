<script setup>
import { ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { ctpMocha} from "../utils/krakenTheme"
import { javascript } from "@codemirror/lang-javascript";
const code = ref("");
</script>

<template>
  <Codemirror
    :extensions="[ctpMocha,javascript()]"
    v-model="code"
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
  />
</template>

<style scoped></style>
