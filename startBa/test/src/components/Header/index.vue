<template>
    <header class="header">
         <span  v-if="back" class="iconfont icon-fanhui" @click="$router.back()"></span>
         <h6>{{titleText}}</h6>
        <slot></slot>
         <!-- <div>
            <span class="iconfont icon-dingdan"></span>
            <span class="iconfont icon-Search"></span>
         </div> -->
        </header>
</template>
<script>
export default {
    props:{
        back:{
            default:true,
            type:Boolean
        },
        title:{
            default:"",
            type:String
        },
        color:String
    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{
        titleText(){
            return this.title?this.title:this.$route.meta.title
        }
    },
    methods:{

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
.header{
    width:100%;
    height: pxTorem(60px);
   @include box_flex;
   @include align;
   @include justify(space-between);
   padding:0 pxTorem(15px);
   @include sizing;
   h6{
       font-size: pxTorem(17px);
       font-weight: 600;
   }
   div{
      width:pxTorem(70px);
      height: 100%;
      
      @include box_flex;
     @include justify(space-between);
     @include align;
   }
}
</style>