<script setup>
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";

import { ref, shallowRef } from "vue";
import catheme from "../assets/kraken-theme.json";

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  theme: "myCustomTheme",
};
const code = ref("// some code...");
const editorRef = shallowRef();
const handleMount = (editor) => {
  console.log(editor);

  editorRef.value = editor;
};

const handleBeforeMount = (monaco) => {
  monaco.editor.defineTheme("myCustomTheme", catheme);
  monaco.editor.setTheme("myCustomTheme");
};
</script>

<template>
  <VueMonacoEditor
    v-model:value="code"
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
    height="100%"
    language="javascript"
    @beforeMount="handleBeforeMount"
  />
</template>

<style scoped></style>
