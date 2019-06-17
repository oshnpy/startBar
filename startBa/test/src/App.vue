<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive include="home">
      <router-view/>
    </keep-alive>
    
  </div>
</template>

<script>
import request from "./utils/request"
export default {
 created(){
  //服务器里面设置了中间件所以设置了跨域
  request.get("/api/user/info")


  //配置服务器  代理
 
 }
}
</script>

<style lang="scss">
@import "./utils/_minix.scss";

#app{
  width:100%;
  height: 100%;
  @include box_flex;
  @include direction(column);
}
</style>
