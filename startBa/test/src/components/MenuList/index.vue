<template>
     <li @click="$router.push({
         name:'detail',
         params:{
             type:list_type,
             id:applicationNumber
         }
     })">
        
                  <div class="typeBox">
                      <span>{{applicationNumber}}</span>
                      <p>
                          <span class="icon iconfont">&#xe639;</span>
                          <b>待审批</b>
                      </p>
                  </div>
                  <div class="typeFather">
                       <div class="typeChild">
                           <p>
                                <span>申请人姓名</span>
                                 <span>{{nickname}}</span>
                           </p>
                           <p>
                                 <span>加班日期</span>
                                 <span>{{new Date(startTime).toLocaleDateString()}}</span>
                           </p>
                     
                     
                  </div>
                   <div class="typeChild">
                       <p>
                            <span>加班类型</span>
                            <span>{{showType(type,list_type)}}</span>
                       </p>
                     <p>
                         <span>加班时数</span>
                      <span>{{reducetime(startTime,endTime)}}</span>
                     </p>
                      
                  </div>
                  </div>
                 
               </li>
              
</template>
<script>
import {showType,reducetime} from "../../utils/computedTime"
export default {
    props:["startTime","describes","nickname","applicationNumber","endTime","type","list_type"],
    components:{

    },
    data(){
        return {
            newTime:""
        }
    },
    computed:{

    },
    methods:{
        showType(type,listType){
          return showType(type,listType)
        },
        reducetime(start,end){
            return reducetime(start,end)
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
  .listBox{
        width:100%;
        li:nth-child(1){
            margin: 0;
        }
        li{
            width:100%;
            height: pxTorem(100px);
            background:#fff;
             padding:0 pxTorem(20px);
             margin-top: pxTorem(5px);
             @include sizing;
            .typeBox{
                width:100%;
                height: pxTorem(20px);
                @include box_flex;
                @include justify(space-between);
                @include align;
              
               
            }
            .typeFather{
                width:100%;
                @include box_flex;
                height: pxTorem(80px);
                @include justify(space-around);
                .typeChild{
                width:50%;
                // background: green;
                @include box_flex;
                @include direction(column);
                // background: pink;
                @include justify;
         
               p{
                padding:pxTorem(5px);
                @include sizing;
                span{
                padding-right:pxTorem(5px);
                @include sizing;
                }
               }
             
            }
             .typeChild:nth-child(2){
                   margin-left: pxTorem(100px);
                   @include sizing;
               }
            }
            
        }
    }
</style>