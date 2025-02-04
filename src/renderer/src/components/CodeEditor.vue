<script setup>
import { ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { basicSetup } from "codemirror";
import { ctpMocha } from "../utils/krakenTheme";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";
import { vue } from "@codemirror/lang-vue";

import { vim } from "@replit/codemirror-vim";



const prop = defineProps({
  path: {
    typeof: String,
  },
});

const code = ref("");
const language = ref();

const ext = prop.path.split(".").pop().toLowerCase();
switch (ext) {
  case "js":
    language.value = javascript();
    break;
  case "ts":
    language.value = javascript();
    break;
  case "py":
    language.value = python();
    break;
  case "json":
    language.value = json();
    break;
  case "css":
    language.value = css();
    break;
  case "xml":
    language.value = xml();
    break;
  case "rs":
    language.value = rust();
    break;
  case "go":
    language.value = go();
    break;
  case "md":
    language.value = markdown();
    break;
  case "vue":
    language.value = vue();
    break;
  case "html":
    language.value = html();
    break;
  
}


function removeUndefinedValues(arr) {
  // Filter out undefined values from the array
  return arr.filter(value => value !== undefined);
}

function readFileSync(filePath) {
  try {
    const data = window.fs.readFileSync(filePath, "utf8"); // Read the file synchronously
    return data;
  } catch (error) {
    console.error("Error reading file:", error.message);
    return null;
  }
}
code.value = readFileSync(prop.path);
</script>

<template>
  <Codemirror
    :extensions=" removeUndefinedValues([ctpMocha,vim(),language]) "
    v-model="code"
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    
  />
</template>

<style scoped></style>
