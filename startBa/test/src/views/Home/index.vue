<template>
    <div class="wrapper">
        <el-header>
             <div>
            <span class="iconfont icon-dingdan"></span>
            <span class="iconfont icon-Search"></span>
         </div>
        </el-header>
        <section class="section">
           <menuTab @change="changeFn"/>
          <menuChoose :type="tableOptions.type" @chooseChange="chooseChange"/>
           <ul class="listBox">
              <menuList 
              v-for="item in tabList" 
              :key="item.applicationNumber"
              :startTime='item.startTime'
              :describes="item.describes"
              :list_type='item.list_type'
              :nickname='item.nickname'
              :applicationNumber='item. applicationNumber'
              :endTime='item.endTime'
              :type='item.type'
               />
           </ul>
           <!-- <div class="taskFa">
              +发起任务
           </div> -->
      <div class="mask" @click="flag=!flag">+发起服务</div>
      <div class="msg" v-show="flag" @click.self="flag=false"></div>
      <div class="small" v-show="flag">
          <div @click="$router.push('/commit/overtime')">
              <p class="iconfont icon-faqi"></p>
              <span>加班</span>
          </div>
          <div @click="$router.push('/commit/vacation')">
              <p class="iconfont icon-shouye"></p>
              <span>休假</span>
          </div>          
      </div>
        </section>
    </div>
</template>
<script>
import api from "../../api/index"
import request from "../../utils/request"
import menuTab from "../../components/MenuTab"
import menuChoose from "../../components/MenuChoose"
import menuList from "../../components/MenuList"
import {mapState,mapActions} from "vuex"
export default {
    name:"home",
    props:{

    },
    components:{
        menuTab,
        menuChoose,
        menuList
    },
    data(){
        return {
            tableOptions:{
                status:0,
                type:"overtime",
                create_at:0,
                pageSize:10,
                page:1
            },
            tabList:[],
            flag:false
        }
    },
    computed:{
        //  ...mapState("user",["userinfo"])
    },
    methods:{
          ...mapActions("user",["getUserInfo"]),
        changeFn(index){
            // console.log(index);
            this.tableOptions.status=index;
            this.tableOptions.type="overtime"
            this.getTaskList();
        },
         getTaskList(){
           api.taskList({
               ...this.tableOptions
           }).then(res=>{
              this.tabList=res.data;
           })
    
        },
        chooseChange(type){
        
            this.tableOptions.type=type;
           this.getTaskList()
        }
    },
    created(){
        console.log("home")
        this.getTaskList();
        this.getUserInfo();
    },
    mounted(){
       
    },
     beforeRouteEnter(to,from,next){
        request.get("/api/user/info").then(res=>{
              next();
        })
      
    }
}
</script>
<style scoped lang="scss">
@import "../../utils/common.scss";
@import "../../utils/_minix.scss";
.iconfont{
    font-size: pxTorem(25px);
}
.wrapper{
    width:100%;
    height: 100%;
    @include box_flex;
    @include direction(column);
}

.section{
    width:100%;
    @include flex;
//    background: #fff;
   overflow-y:auto;
  
    
  
    .taskFa{
        width:pxTorem(100px);
        height: pxTorem(40px);
        background: #0C6142;
        border-radius:pxTorem(30px);
        text-align: center;
        line-height:pxTorem(40px); 
        position: fixed;
        bottom:pxTorem(30px);
        right:pxTorem(30px);
        color: #fff;
    }
}
.msg {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  position: absolute;
  top: 0;
}
.small {
  width: 100%;
  height: pxTorem(160px);
  background: #fff;
  position: absolute;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mask {
  width: pxTorem(70px);
  height: pxTorem(30px);
  background: green;
  position: absolute;
  bottom: pxTorem(20px);
  border-radius: pxTorem(30px);
  color: #fff;
  text-align: center;
  line-height: pxTorem(30px);
  right: pxTorem(20px);
}


</style>