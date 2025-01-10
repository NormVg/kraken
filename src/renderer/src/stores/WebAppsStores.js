import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWebAppStore = defineStore('web-app-info', () => {
    const WebAppList = ref([])
    const activeWebAppTabs  = ref([])
    

    const ChangeActiveWebAppTabs=(val)=>{
        activeWebAppTabs.value = val
    }

    const ChnageWebAppList = (val)=>{

        WebAppList.value = val
    }
    
    const AddToActiveWebAppList = (val)=>{
        
        activeWebAppTabs.value.push(val)
    }

    const RemoveActiveFromWebAppList = (prop)=>{
        
        const index = activeWebAppTabs.value.findIndex(
            (item) => item.name === prop.name );

          var list = activeWebAppTabs.value;

          if (index >= 0 && index < list.length) {
            list.splice(index, 1); // Remove 1 element at the specified index
          }

          ChangeActiveWebAppTabs(list);

    }

    const IndexOfActiveWebAppList = (name)=>{
        const index = activeWebAppTabs.value.findIndex(
            (item) => item.name === name );

            return index
    }

    return {
        WebAppList,ChnageWebAppList,
        activeWebAppTabs,ChangeActiveWebAppTabs,RemoveActiveFromWebAppList,AddToActiveWebAppList,
        
        IndexOfActiveWebAppList,

    }
})