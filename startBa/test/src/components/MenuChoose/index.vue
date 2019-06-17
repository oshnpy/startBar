<template>
    <div class="tabBox">
               <div>
                   <b :class="{active:item.type===type}" v-for="(item,index) in chooseObject" :key="index" @click="chooseFn(item.type)">{{item.title}}</b>
               </div>
               <p>
                   <span class="icon iconfont">&#xe61c;</span>
                    <span class="icon iconfont">&#xe617;</span>
               </p>
           </div>
</template>
<script>
export default {
    props:{
        type:String
    },
    components:{

    },
    data(){
        return {
            ind:0,
            chooseObject:[
                {
                    title:"加班",
                    type:"overtime"
                },
                 {
                    title:"休假",
                    type:"vacation"
                }
            ]
        }
    },
    computed:{

    },
    methods:{
        chooseFn(type){
    //    console.log(type)
        this.$emit("chooseChange",type)
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
@import "../../utils/common.scss";
@import "../../utils/_minix.scss";
.iconfont{
    font-size: pxTorem(25px);
}
.tabBox{
       
        width:100%;
        height: pxTorem(60px);
        @include box_flex;
       @include justify;
       @include align;
       margin-top: pxTorem(20px);
       @include sizing;
       background: #fff;
     
       >div{
           @include box_flex;
           width:pxTorem(200px);
           height: pxTorem(25px);
           b{
              @include flex;
              border:1px solid #0C6142; 
              text-align: center;
              line-height: pxTorem(25px);
              color: #000;
           }
           .active{
               background: #0C6142;
               color: #fff;
           }
           b:nth-child(2){
               border-bottom-right-radius: pxTorem(20px);
               border-top-right-radius: pxTorem(20px);
           }
           b:nth-child(1){
            border-bottom-left-radius: pxTorem(20px);
            border-top-left-radius: pxTorem(20px);
           }
       }
    }
</style>