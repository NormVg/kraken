import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWinBasicStore = defineStore('win-title-store', () => {
  const TitleVal = ref("Kraken")
  const FolderPath =  ref()
  const onEditor = ref(false)
  const isMiddleBar = ref(true)
  const isSidebar = ref(false)
  const isFileXSideBar = ref(true)


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
    isFileXSideBar, ChangeIsFileXSideBar
   }
})