<template>
  <input type="text" id="filex-new-inp"   @blur="prop.onBlurCall" v-model="newNameFF"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { createFile, createFolder } from '../utils/SysManage';

const prop = defineProps({
  path: String,
  isFolder:Boolean,
  onBlurCall:Function,
  reloadDirCall:Function

});


const newNameFF = ref('')




onMounted(()=>{
  
    console.log('in val')
    document.getElementById("filex-new-inp").focus()
      
    document.getElementById("filex-new-inp").addEventListener("keyup",async (e)=>{
        if (e.key === "Enter" ){
            
          if (prop.isFolder ===  true){
            console.log("making folder on path:",prop.path,"of named",newNameFF.value)
              createFolder(newNameFF.value,prop.path)

          }else{
            console.log("making file on path:",prop.path,"of named",newNameFF.value)
            createFile(newNameFF.value,prop.path)
          }
          
          await prop.reloadDirCall()
          document.getElementById("filex-new-inp").blur()
        }
        console.log("keydown")
    })

    
  


})
</script>

<style scoped>
#filex-new-inp{
  height: 20px;
  width: 90%;
  margin-bottom:10px ;
  background: none;
  color: whitesmoke;
  border: 1px solid whitesmoke;
  margin-left: 5px;
  border-radius: 5px;
}


#filex-new-inp:focus{
  outline: none;
  border: 1px solid whitesmoke;
}
</style>
