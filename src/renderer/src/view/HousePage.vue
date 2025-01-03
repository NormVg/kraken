<script setup> 

</script>

<template>
    <div id="screen">

    </div>
</template>

<style scoped>

#screen{
    border:1px solid red;
    width: calc(100vw - 2px);
    height: calc(100vh - 40px);
    position: fixed;
    left: 50%;
    top: calc(50% + 15px) ;
    transform: translate(-50%, -50%);

    overflow-x:hidden
}

</style>