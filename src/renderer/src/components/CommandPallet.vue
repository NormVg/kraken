<template>
  <div id="cmd-box">
    <input v-model="inputData" placeholder="$" id="cmd-inp">
    
    <div id="cmd-sr">
        <div v-for="(item,index) in ItemSearch" :key="item" id="cmd-item" :class=" index  === 0 ? 'item-active' : '' " >
           > {{ item.item }}
        </div>
    </div>
    
  </div>
</template>

<script setup>
import { useFuse } from '@vueuse/integrations/useFuse';
import { ref,computed, onMounted } from 'vue';
import { useWinBasicStore } from '../stores/basicInfo';

const WinBasic = useWinBasicStore()

const inputData = ref("")

const somefunction = (name)=>{
    console.log("fucntion called "+name)
}

const data = [
    { "name": "Next Screen", "call":WinBasic.NextCurrentScreenWindow},
    { "name": "Previous Screen", "call": WinBasic.PrevCurrentScreenWindow },
    { "name": "Terminal Screen", "call": ()=>{WinBasic.NextCurrentScreenWindow(1)} },
    { "name": "Editor Screen", "call": ()=>{WinBasic.NextCurrentScreenWindow(0)} },
    { "name": "Close Code Tab", "call": ()=>{WinBasic.closeCodeTab(WinBasic.CodeEditorTab[WinBasic.ActiveCodeEditorTab])} },
    { "name": "Open SideBar", "call": ()=>{ WinBasic.ChangeIsSideBar(true)}  },
    { "name": "Open File Explorer", "call": ()=>{ WinBasic.ChangeIsSideBar(true); WinBasic.ChangeIsFileXSideBar(true) } },
    { "name": "Open ToolBar", "call": ()=>{ WinBasic.ChangeIsSideBar(true); WinBasic.ChangeIsFileXSideBar(false) } },
    { "name": "Close SideBar", "call": ()=>{ WinBasic.ChangeIsSideBar(false)} },
    { "name": "Close File Explorer", "call": ()=>{ WinBasic.ChangeIsSideBar(false) } },
    { "name": "Close ToolBar", "call": ()=>{ WinBasic.ChangeIsSideBar(false) } },
    { "name": "Open Youtube", "call": somefunction },
    { "name": "Open ChatGpt", "call": somefunction },
    { "name": "Open YTMusic", "call": somefunction },
    { "name": "Open Figma", "call": somefunction },
    { "name": "Open Github", "call": somefunction },
    
];



const extractNames = (list) => list.map((item) => item.name);

const executeFunctionByName = (name) => {
    const item = data.find(item => item.name === name);
    if (item && typeof item.call === "function") {
        item.call(item.name);
    } else {
        console.log("Function not found for:", name);
    }
};




const ItemSearch =  computed(()=>{

    const { results } = useFuse(inputData.value, extractNames(data) ,{matchAllWhenSearchEmpty:true})
    
    // console.log("res- ",results.value)
    return results.value
})


onMounted(()=>{

    document.getElementById("cmd-inp").addEventListener("keyup",(e)=>{
        if (e.key === "Enter" ){
            // confirm(ItemSearch.value[0].item)
            executeFunctionByName(ItemSearch.value[0].item)
        }
    })


    document.getElementById("cmd-inp").focus()

})



</script>

<style scoped>

.item-active{
    background-color: #f38ba850;
}

#cmd-item{
    padding: 0 10px;
    margin-top: 5px;
}

#cmd-sr{
    /* background-color: red; */
    height: calc( 100% - 90px);
    width: 100%;
    overflow: hidden;
}

#cmd-box{
    width: 35vw;
    height: 60vh;

    border: 1px solid whitesmoke;
    border-radius:10px ;
    position: fixed;
    z-index: 30;

    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    background-color: #0A0D18;
    

}

#cmd-inp{
    background: #1C1C2A;
    margin: 0 auto;
    border: none;
    width: calc( 100% - 20px) ;
    height: 60px;
    margin-top: 20px;
    font-size: 14px;
    color: whitesmoke;
    font-family: "JetBrains Mono", monospace;
    padding: 0px 10px;
    
}


#cmd-inp:focus{
    outline: none;
}

</style>