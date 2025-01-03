<script setup >
import {  VueMonacoEditor} from '@guolao/vue-monaco-editor';

import * as monaco from "monaco-editor"
import { ref, shallowRef,onMounted } from 'vue'



const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  theme:"myCustomTheme",
  
}
const code = ref('// some code...')
const editorRef = shallowRef()
const handleMount = (editor) => {
  
  console.log(editor)



  editorRef.value = editor

}

monaco.editor.defineTheme("myCustomTheme", {
    base: "vs-dark", // Can also be "vs" or "hc-black"
    inherit: true,
    rules: [
      { token: "comment", foreground: "0A0D18", fontStyle: "italic" },
      { token: "keyword", foreground: "0A0D18" },
      { token: "string", foreground: "0A0D18" },
    ],
    colors: {
      "editor.background": "#0A0D18",
      "editor.lineHighlightBackground": "#0A0D18",
      "editorCursor.foreground": "#0A0D18",
    },
  });

// onMounted(() => {

// });
</script>

<template>
  <VueMonacoEditor
  v-model:value="code"
    
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
    height="100%"
    language="javascript"
  />
</template>

<style scoped>

</style>