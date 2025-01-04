<script setup>
import { provide ,ref,defineProps, computed, watch} from 'vue'

const prop = defineProps({
    currentTab:{
        typeof:Number
    },
    updateTabsList:{
        typeof:Function
    }
})

const TabNow = computed(()=>{
    return prop.currentTab
})
const TabList = ref([])

watch(TabList,()=>{
    updateTabsList(TabList)
})

const removeTab =(tab)=>{
TabList.value = TabList.value.filter(rr => rr !== tab)
}

const registerTab =(tab)=>{
TabList.value.push(tab)
}

provide("tab-manager",{TabNow,TabList,registerTab,removeTab});
</script>

<template>
<slot></slot>
</template>

<style scoped>

</style>
