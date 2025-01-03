<script setup>
import StartPage from './view/StartPage.vue';
import Header from './components/Header.vue';
import HousePage from './view/HousePage.vue';
import { useWinBasicStore } from './stores/basicInfo';

const Win =  useWinBasicStore()
</script>

<template>

<Header/>

<StartPage v-if="!Win.onEditor"/>
<HousePage v-else />
</template>

