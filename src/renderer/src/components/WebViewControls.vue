<script setup>
import Rleft from "../assets/icons/relay-left.png"
import Rright from "../assets/icons/relay-right.png"
import Rreload from "../assets/icons/relay-reload.png"

import Rclose from  "../assets/icons/close.png"
</script>

<template>
  <div id="wvc-box">
    
    <button><img :src="Rleft"></button>
    <button><img :src="Rreload"></button>
    <button><img :src="Rright"></button>
    <input type="text" name="" id="" />
    <button><img :src="Rclose"></button>
  </div>
</template>

<style scoped>
button img{
    width: 20px;
    height: 20px;
    background: none;
}
button{
    background: none;
    border: none;
    border-radius: 5px;
    transition: all ease-in-out 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
button:active{
    outline: 1px solid #ececf1;
}
button:hover{
    background-color:#53556e;
    border: none;
    
}
input{   
    border: none;
    background: none;
    color: #7A7A7A;
    border-radius: 5px;
    height: 20px;
    width: 100%;
    padding: 0px 10px;
}
input:hover{   
    background-color:#323342;
}
input:focus{
    background-color:#53556e;
/* outline: none; */
outline: 1px solid #ececf1;
color:#ececf1
}
#wvc-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
}
</style>
