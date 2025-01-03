<script setup>
import StartPage from './view/StartPage.vue';
import Header from './components/Header.vue';
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
import { useWinBasicStore } from './stores/basicInfo';

const Win =  useWinBasicStore()
</script>

<template>
    <Header/>

<StartPage v-if="!Win.onEditor"/>
</template>

