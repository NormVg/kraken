import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWinBasicStore = defineStore('win-title-store', () => {
  const TitleVal = ref("Kraken")
  const FolderPath =  ref()
  const onEditor = ref(false)
  const CodeEditorTab = ref([])
  const ActiveCodeEditorTab = ref(0)
  const isMiddleBar = ref(true)
  const isSidebar = ref(false)
  const isFileXSideBar = ref(true)



const closeCodeTab = (prop)=>{
  const index = CodeEditorTab.value.findIndex(item => item.name === prop.name && item.path === prop.path)
  var list = CodeEditorTab.value
  if (index >= 0 && index < list.length) {
    list.splice(index, 1); // Remove 1 element at the specified index
}
ChangeCodeEditorTab(list)
}

  const switchToCodeTab = (prop)=>{
    
    const index = CodeEditorTab.value.findIndex(item => item.name === prop.name && item.path === prop.path)
  
    ChangeActiveCodeEditorTab(index)
  }

  const ChangeActiveCodeEditorTab = (val) =>{
    ActiveCodeEditorTab.value = val
  }

  const ChangeCodeEditorTab = (val)=>{
    CodeEditorTab.value = val
  }

  const ChangeIsFileXSideBar = (val)=>{
    isFileXSideBar.value = val
  }

  const ChangeIsSideBar = (val)=>{
    isSidebar.value = val
  }

  const ChangeIsMiddleBar=(val)=>{
    isMiddleBar.value = val
  }

  const ChangeOnEditor=(val)=>{
    onEditor.value = val
  }

  const ChangeTitle = (text) => {
    TitleVal.value = text
  }
  const ChangeFolder = (text) => {
    
    FolderPath.value = text
  }
  return { 
    TitleVal,ChangeTitle,
    FolderPath,ChangeFolder,
    onEditor,ChangeOnEditor,
    isMiddleBar,ChangeIsMiddleBar,
    isSidebar,ChangeIsSideBar,
    isFileXSideBar, ChangeIsFileXSideBar,
    CodeEditorTab,ChangeCodeEditorTab,
    ActiveCodeEditorTab, ChangeActiveCodeEditorTab,switchToCodeTab,closeCodeTab
   }
})