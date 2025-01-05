<script setup> 
import CodeEditorManager from '../components/CodeEditorManager.vue';
import FocusBar from '../components/FocusBar.vue';
import WebView from '../components/WebView.vue';
import SideBar from '../components/SideBar.vue';

import { useWinBasicStore } from '../stores/basicInfo';

import { computed } from 'vue';

const WinBasic = useWinBasicStore()

const ScreenSideBarStyle = computed(()=>{ 
     return WinBasic.isSidebar ? 'width:calc(100vw - 35% - 2px)' :   'width:calc(100vw - 2px);'    
})


</script>

<template>
    <div id="screen" :style="ScreenSideBarStyle">

        <CodeEditorManager/>
        <!-- <WebView/> -->
        <FocusBar/> 
    </div>
    <SideBar/>
</template>

<style scoped>

#screen{


    height: calc(100vh - 40px);
    position: fixed;
    left: 0%;
    top: calc(50% + 15px) ;

    transform: translateY(-50%);
    transition: 350ms ease-in-out;

}

</style>