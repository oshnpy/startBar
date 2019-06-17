<template>
    <div class="wrap">
       <div class="top">
           <el-header/>
      <div class="det">
        <div class="left">
         <span class="imgs"><img :src="list.avatar" alt=""></span>
        </div>
        <div class="middle">
          <ul>
            <li>
              <p>申请人姓名</p>
              <p>{{list.nickname}}</p>
            </li>
            <li>
              <p>直接主管</p>
              <p class="p">秦毅超</p>
            </li>
            <li>
              <p>申请单号</p>
              <p class="p">{{list.applicationNumber}}</p>
            </li>
            <li>
              <p>发起时间</p>
              <p class="p">{{new Date(list.create_at).toLocaleDateString()}}</p>
            </li>
          </ul>
        </div>
        <div class="right">
          <p>></p>
        </div>
      </div>
    </div>
    <div class="content">
      <h2>申请信息</h2>
      <div class="cont">
        <ul>
          <li>
            <p>{{titletext}}日期</p>
            <p>{{new Date(list.create_at).toLocaleDateString()}}</p>
            <!-- <el-timer v-model="timeDate"></el-timer> -->
          </li>
          <li>
            <p>{{titletext}}类型</p>
            <p>{{showType}}</p>
          </li>
          <li>
            <p>{{titletext}}起始时间</p>
            <p>{{new Date(list.startTime).toLocaleDateString()}}</p>
          </li>
          <li>
            <p>{{titletext}}截止时间</p>
            <p>{{new Date(list.endTime).toLocaleDateString()}}</p>
          </li>
          <li>
            <p>共计时数</p>
            <p>{{reducetime}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="cont2">
      <h2>{{titletext}}事由</h2>
      <p>{{list.describes}}</p>
    </div>
    <div class="cont3">
      <div class="cont3_top">
        <p class="y"></p>
        <p class="r">附件</p>
        <p class="s">共4件 ></p>
      </div>
      <div class="cont3_cont">
        <div v-for="(item,index) in list.annex" :key="index">
          <img :src="'http://localhost:3000'+item" alt="">
        </div>
        <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560419022393&di=51d127faafd3a8e5e9deab2f0f3fad52&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F04%2F20151104162604_Kek2G.jpeg" alt>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560419022392&di=c7bee3a4df7d2a80e06eab5eeb0fc448&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F20%2F20151020072851_EQUfi.thumb.700_0.jpeg" alt>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560419022390&di=5cf63211d0a97e18bdf0ed3f693c04a6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F09%2F20161209170810_yKFnr.jpeg" alt> -->
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li>
          <dl>
            <dd></dd>
            <dt>审批历史</dt>
          </dl>
        </li>
        <li class="li li_l">退回</li>
        <li class="li li_r">同意</li>
      </ul>
    </div>
    </div>
</template>
<script>
import request from "../../utils/request"
import {showType,reducetime} from "../../utils/computedTime"
import api from "../../api/index"
export default {
    props:{
        type:String,
        id:String,
        applicationNumber:String
    },
    components:{
   
    },
    data(){
        return {
            list:{},
            // timeDate:""
        }
    },
    computed:{
        title(){
            return this.type==="overtime"?"办公室申请表":"办公室调休申请表"
        },
        titletext(){
            return this.type==="overtime"?"加班":"休假"
        },
        showType(){
          return showType(this.list.type,this.list.list_type)
        },
        reducetime(){
          return reducetime(this.list.startTime,this.list.endTime)
        }
    },
    methods:{
      
    },
    created(){
       
      api[`${this.type}Detail`]({
          applicationNumber:this.id
      }).then(res=>{
          console.log(res.data)
          this.list=res.data;
      })
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
@import "../../utils/common.scss";
@import "../../utils/_minix.scss";

.wrap {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  overflow: scroll;
}
.top {
  width: 100%;
  height: pxTorem(150px);
  background: #0b6242;
  border-bottom-left-radius: pxTorem(40px);
  border-bottom-right-radius: pxTorem(40px);
  padding:0 pxTorem(15px);
  @include sizing;
  .det {
    width: 100%;
    height: pxTorem(240px);
    // margin-top: pxTorem(5px);
    display: flex;
    .left {
      flex: 2;
    .imgs{
        width:pxTorem(50px);
        display: inline-block;
        height: pxTorem(50px);
        border-radius: 50%;
        background: #eee;
        img{
            width:100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    }
    .middle {
      flex: 7;
      ul {
        li {
          display: flex;
          color: #fff;
          padding-left: pxTorem(20px);
          p {
            text-align: center;
            line-height: pxTorem(15px);
            font-size: pxTorem(12px);
            margin-right: pxTorem(30px);
            @include sizing;
          }
          .p {
            margin-left: 28px;
          }
        }
      }
    }
    .right {
      flex: 1;
      p {
        color: #fff;
        font-size: pxTorem(14px);
      }
    }
  }
}
.content {
  width: 90%;
  height: pxTorem(220px);
  background: #fff;
  margin-left: 5%;
  border-radius: pxTorem(20px);
  margin-top: pxTorem(-15px);
  @include sizing;
  h2 {
    width: 94%;
    height: pxTorem(50px);
    border-bottom: 1px solid#ccc;
    line-height: pxTorem(50px);
    font-size: pxTorem(16px);
    padding-left: pxTorem(20px);
    color: #1a0808;
  }
  .cont {
    width: 94%;
    height: pxTorem(320px);
    padding:0 pxTorem(20px);
    @include sizing;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        line-height: pxTorem(30px);
        font-size: pxTorem(13px);
        color: #bfbfbf;
      }
    }
  }
}
.cont2 {
  width: 90%;
  height: pxTorem(120px);
  background: #fff;
  margin-left: 5%;
  border-radius: pxTorem(20px);
  margin-top: pxTorem(10px);
  color: #6f6f6f;
  h2 {
    width: 94%;
    height: pxTorem(50px);
    border-bottom: 1px solid#ccc;
    line-height: pxTorem(50px);
    font-size: pxTorem(16px);
    padding-left: pxTorem(20px);
  }
  p {
    width: 94%;
    padding-left: pxTorem(20px);
    font-size: pxTorem(14px);
    line-height: pxTorem(50px);
  }
}
.cont3 {
  width: 90%;
  height: pxTorem(120px);
  background: #fff;
  margin-left: 5%;
  border-radius: pxTorem(20px);
  margin-top: pxTorem(10px);
  color: #6f6f6f;
  @include sizing;
  .cont3_top {
    width: 94%;
    height: pxTorem(40px);
    border-bottom: 1px solid#ccc;
    line-height: pxTorem(40px);
    font-size: pxTorem(14px);
    padding-left: pxTorem(20px);
    display: flex;
    line-height: pxTorem(30px);
    @include sizing;

    .y {
      width: pxTorem(15px);
      height: pxTorem(15px);
      border-radius: 50%;
      background: #ccc;
      margin-top: pxTorem(5px);
      @include sizing;
    }
    .r {
      margin-left: 5%;
      color: #737373;
    }
    .s {
      margin-left: 50%;
      color: #eeeeee;
    }
  }
  .cont3_cont {
    width: 94%;
    padding-left: pxTorem(20px);
    height: pxTorem(80px);
    display: flex;
    >div{
      
     img {
      width: 50%;
      height: 100%;
      margin-top: 2%;
      margin-left: 1%;
      @include sizing;
    }
    }
    
  }
}
.bottom {
  width: 100%;
  height: pxTorem(40px);
  background: #fff;
  position: fixed;
  bottom:0;
  left: 0;
  ul {
    display: flex;
    text-align: center;
    li {
      flex: 1;
      height: 100%;
      dl {
        dd {
          width: pxTorem(15px);
          height: pxTorem(15px);
          border-radius: 50%;
          background: #ccc;
          margin-left: pxTorem(50px);
        }
      }
    }
    .li {
      line-height: pxTorem(30px);
      height: 100%;
    }
    .li_l {
      background: #404a53;
      color: #fff;
    }
    .li_r {
      height: 100%;
      background: #0b6242;
      color: #fff;
    }
  }
}
</style>