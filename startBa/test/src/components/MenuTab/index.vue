<template>
    <div class="chooseBox">
               <dl v-for="(item,index) in iconList" :key="index" :class="{active:index===ind}" @click="changeClass(index)">
                   <dt >
                        <span :class="item.icon"></span>
                   </dt>
                   <dd>{{item.title}}</dd>
               </dl>
                
           </div>
</template>
<script>
import request from '../../utils/request';
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            ind:0,
         iconList:[
             {
                 title:"待处理",
                 icon:"iconfont icon-daichuli",
                 index:0
             },
             {
                title:"已发起",
                 icon:"iconfont icon-faqi",
                 index:1  
             },
             {
                  title:"已处理",
                 icon:"iconfont icon-yichuli-xianxing",
                 index:2
             }
         ]
        }
    },
    computed:{

    },
    methods:{
        changeClass(index){
           this.ind=index;
           
         this.$emit("change",index)
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
  .chooseBox{
        width:100%;
        height: pxTorem(100px);
        background: #fff;
        @include box_flex;
        box-shadow: 0 25px 50px #eee;
        dl{
            width:33.3%;
            height: 100%;
            @include box_flex;
            @include direction(column);
            @include justify;
            @include align;
        }
        .active{
           color: green;
        }
    }
</style>