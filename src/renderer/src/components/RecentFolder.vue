<script setup>
const prop = defineProps({
   title:String,
    path:String
})
</script>

<template>
    <div id="past-box">
        <div>{{ prop.title }}</div>
        <div id="past-path">
            
            {{ prop.path }}
        </div>
    </div>
</template>

<style scoped>
#past-box{
    width:95% ;
    background-color: #0A0D18;
    transition: all 200ms ease-in-out;
    border: 1px solid #71738E;
    border-radius: 5px;
    height: 45px;
    padding: 5px 10px;
}

#past-box:hover{
    background-color: #121522;
}

#past-path{
    color: #71738E;
    font-size: 12px;
    margin-top: 5px;
    /* width: 97%; */
    overflow: hidden;
    
}
</style>
