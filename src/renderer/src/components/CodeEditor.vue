<script setup>
import { onMounted, ref } from "vue";
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

import { Vim ,vim } from "@replit/codemirror-vim";
import { saveFilePath } from "../utils/SysManage";

import { useWinBasicStore } from "../stores/basicInfo";

import { Copilet,CopiletPrompt } from "../utils/Copilet";

const WinBasic = useWinBasicStore()

const prop = defineProps({
  path: String,
  name:String
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


Vim.defineEx('write', 'w', function() {
    // save the file
    console.log("save file")
    saveFilePath(code.value,prop.path)
});


Vim.defineEx('wq-writequit', 'wq', function() {
    // save the file
    console.log("save and exit")
    saveFilePath(code.value,prop.path)
    WinBasic.closeCodeTab(prop)

});


Vim.defineEx('quit', 'q', function() {
    // save the file
    console.log("exit",prop)
    WinBasic.closeCodeTab(prop)
});

Vim.defineEx('k-mind', 'k',  function(e,r) {

    if (r.args[0]==="?") {
      console.log("k?")
      // r.selectionLineEnd
      let newArr = r.args.slice(1);
      let prompt = newArr.join(" ")
      // console.log(e.getLine(r.selectionLine),r)
      console.log(e.getInputField());

      const prefix = e.getRange({ line: 0, ch: 0 }, { line: r.selectionLine, ch: Infinity });
      const suffix = e.getRange({ line: r.selectionLine, ch: 0 }, { line: e.lineCount()-1, ch: Infinity });
      // console.log('prefix',prefix,'suffix',suffix)
      CopiletPrompt(prompt,prefix,suffix,language.value).then((code)=>{
        console.log('code',code)
        e.replaceRange(`\n${code}`, { line: r.selectionLine, ch: Infinity });
      })
      // e.replaceRange(`\n${code}`, { line: r.selectionLine, ch: Infinity });

    }




});

import { inlineCopilot } from "@mightymeld/codemirror-copilot";

const AiCopilet = inlineCopilot(async (prefix, suffix) => Copilet(prefix,suffix,language.value),3000)

</script>

<template>
  <Codemirror
    :extensions=" removeUndefinedValues([ctpMocha,vim(),language,AiCopilet]) "
    v-model="code"
    :style="{ height: '100%', marginLeft:'1px' }"
    :autofocus="true"
    :indent-with-tab="true"

  />
</template>

<style >
.cm-vim-panel input{
  color: #a6e3a1 !important;
}

</style>
