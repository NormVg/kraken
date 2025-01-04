import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorInfo = defineStore('win-editor-info', () => {
    const ActiveEditorTab = ref(null)
    const EditorTabList = ref([])
    const EditorExtention = ref("[ctpMocha]")

    function ChangeActiveEditorTab (val){
        ActiveEditorTab.value = val
    }

    function ChangeEditorTabList(val){
        EditorTabList.value = val
    }

    function ChangeEditorExtention( val){
        EditorExtention.value = val
    }

  return { 
    ActiveEditorTab,ChangeActiveEditorTab,
    EditorTabList,ChangeEditorTabList,
    EditorExtention,ChangeEditorExtention
   }
})