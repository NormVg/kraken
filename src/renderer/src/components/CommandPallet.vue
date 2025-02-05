<template>
  <div id="cmd-box">
    <input v-model="inputData" id="cmd-inp">
    
    <div id="cmd-sr">
        <div v-for="(item,index) in ItemSearch" :key="item" id="cmd-item" :class=" index  === 0 ? 'item-active' : '' " >
            {{ item.item }}
        </div>
    </div>
    
  </div>
</template>

<script setup>
import { useFuse } from '@vueuse/integrations/useFuse';
import { ref,computed, onMounted } from 'vue';

const inputData = ref("john")

const data = [
  'John Smith',
  'John Doe',
  'Jane Doe',
  'Phillip Green',
  'Peter Brown',
]

const ItemSearch =  computed(()=>{

    const { results } = useFuse(inputData.value, data,{matchAllWhenSearchEmpty:true})
    
    console.log("res- ",results.value)
    return results.value
})


onMounted(()=>{

    document.getElementById("cmd-inp").addEventListener("keyup",(e)=>{
        if (e.key === "Enter" ){
            confirm(ItemSearch.value[0].item)
        }
    })

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