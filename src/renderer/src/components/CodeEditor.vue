<script setup>
import { ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { ctpMocha} from "../utils/krakenTheme"
import { javascript } from "@codemirror/lang-javascript";

const prop = defineProps({
  path:{
    typeof:String
  }
})
const code = ref("");

function readFileSync(filePath) {
    try {
        const data = window.fs.readFileSync(filePath, 'utf8'); // Read the file synchronously
        return data;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}
code.value = readFileSync(prop.path)

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
