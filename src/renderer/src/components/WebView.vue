<template>
    <div  className='app-view-box ' >
      
      <div>
      <webview id="foo" :src="prop.url" allowpopups='true' ></webview>
      </div>
    
    </div>
</template>

<script setup> 
const prop = defineProps({
  url:{
    typeof:String,
    default:"https://google.com"}
})
import banner from "../assets/banner.png"
</script>

<style scoped>
.app-view-box {
    background-image: url("../assets//banner.png");
  height: 85vh;
  
  border: 2px solid #c499db;
  border-radius: 7px;
  width:  calc(100% - 30px);

  overflow: hidden;
  margin-right: 15px;
  margin-left: 15px;

  background-repeat: no-repeat;
  background-position: center;
  background-color: #0a0d1877;
  background-size: 250px;



  -webkit-box-shadow: inset 0px 0px 30px -7px rgba(145,210,217,1);
  -moz-box-shadow: inset 0px 0px 30px -7px rgba(145,210,217,1);
  box-shadow: inset 0px 0px 30px -7px rgba(145,210,217,1);




  animation-duration: 1s;
  animation-iteration-count:infinite ;
}

.app-view-box div {
  height: 100%;
  width: 100%;
}

.app-view-box div webview {
  height: 100%;
  width: 100%;
}

</style>