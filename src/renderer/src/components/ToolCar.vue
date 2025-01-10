<template>
    <div id="side-car-box">
        <SideTerminal/>
        <SideBarWeb/>
    </div>

</template>

<script setup>
import SideTerminal from './SideBarTools/SideTerminal.vue';
import SideBarWeb from './SideBarTools/SideBarWeb.vue';
</script>

<style scoped>
#side-car-box{

height: 88vh;
width: 100%;
/* overflow: auto; */
overflow-y: scroll;
padding-top: 10px;

display: flex;
justify-content: start;
align-items: center;
flex-direction:column;
gap: 20px;
}
</style>