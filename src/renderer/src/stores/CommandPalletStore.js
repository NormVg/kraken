import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommandPalletStore = defineStore('cm-pallet-store', () => {
    const isCommandPallet = ref(false)

    const ChangeIsCommandPallet = (val)=>{
        isCommandPallet.value = val
    }
 

  return { isCommandPallet,ChangeIsCommandPallet }
})