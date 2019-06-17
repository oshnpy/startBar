<template>
      <div class="wrap">
       <div class="top">
        <el-header :title="type==='overtime'?'办公室加班申请表':'办公室调休申请表'">
            <span></span>
        </el-header>
      <div class="det">
        <div class="left">
         <span class="imgs"><img :src="userinfo.avatar" alt=""></span>
        </div>
        <div class="middle">
          <ul>
            <li>
              <p>申请人姓名</p>
              <p>{{userinfo.nickname}}</p>
            </li>
            <li>
              <p>直接主管</p>
              <p class="p">秦毅超</p>
            </li>
            <li>
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
            <p></p> 
           <el-timer v-model="timeDate"></el-timer> 
          </li>
          <li>
            <p>{{titletext}}类型</p>
            <p>
              <select v-model="usertype">
            <option value="-1">默认</option>
          <option v-for="val in this[type+'Type']"
           :key="val.id" 
           :value="val.id">
          {{val.title}}
          </option>
              </select>
            </p>
          </li>
          <li>
            <p>{{titletext}}起始时间</p>
            <p>
              <el-picker
              v-model="starttime"
              :selectableRange="[
              '21:00:00 - 24:00:00',
              '07:00:00 - 09:00:00'
              ]"
              ></el-picker>
            </p>
          </li>
          <li>
            <p>{{titletext}}截止时间</p>
            <p>
              <el-picker
              v-model="endtime"
              @change="endtimeSelected"
              :selectableRange="[
              '21:00:00 - 24:00:00',
              '07:00:00 - 09:00:00'
              ]"
              ></el-picker>
            </p>
          </li>
          <li>
            <p>共计时数</p>
            <p>{{num}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="cont2">
      <h2>{{titletext}}事由</h2>
      <p>
        <textarea v-model="describe">
          
        </textarea>
      </p>
    </div>
    <div class="cont3">
      <h2>
        <div class="addpic">+
          上传附件
          <input type="file" @change="submitFile" class="files">
        </div>
           
      </h2>
      <div class="imgBox">
        <ul>
          <li 
          v-for="(item,index) in images"
          :key="index"
          >
            <span @click="images.splice(index,1)">X</span>
            <img :src="'http://localhost:3000'+item" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li @click="$router.back()">取消</li>
        <li class="li li_r" @click="submitTask">提交</li>
      </ul>
    </div>
    </div>
    
</template>
<script>
import api from "../../api/index"
import {mapActions,mapState} from "vuex"
export default {
    props:{
        type:String
    },
    components:{

    },
    data(){
        return {
            timeDate:"",
            overtimeType:[
              {
                id:1,
                title:"双休日"
              },
              {
                id:2,
                title:"节假日"
              },
              {
                id:3,
                title:"工作日"
              }
            ],
            vacationType:[
              {
                id:1,
                title:"年假"
              },
              {
                id:2,
                title:"调休"
              }
              
            ],
            starttime:"",
            usertype:-1,
            endtime:"",
            describe:"",
            num:"",
            guide:{
              type:['png','jpg','jpeg','gif','svg'],
              size:3
            },
            images:[]
        }
    },
    computed:{
        ...mapState('user',["userinfo"]),
        titletext(){
            return this.type==="overtime"?"加班":"休假"
        }
    },
    methods:{
        ...mapActions('user',['getUserInfo']),
        endtimeSelected(){
          let starttime=new Date(this.starttime)*1;
          let endtime=new Date(this.endtime)*1;
          let num=endtime-starttime;
          if(num<0){
            alert("时间选择错误")
            return;
          }
          this.num=parseFloat(num/1000/60).toFixed(0);
        },
        submitFile(e){
          let userfile=e.target.files[0];//获取到图片对象
          let {type,size}=userfile;
          let filetype=type.match(/\/(\w+)$/i)[1];
          let error="";
          if(!this.guide.type.includes(filetype)){
            //判断是否包含
            error=`请上传${this.guide.type.join()}类型的文件`
          }
          if(this.guide.size*1024*1024<size){
            error=`请上传小于${this.guide.size}MB大小的文件`
          }
          if(error){
            alert(error);
            return;
          }
          console.log(userfile);
          const fromdata=new FormData();
          //向ajax对象提交键值对格式的参数的 可以提交二进制流
          fromdata.append("file",userfile);
          api.submitFile(fromdata).then(res=>{
           this.images.push(res.url)
          })
       
          
        },
        submitTask(){
          let options={
            annex:this.images,
            describe:this.describe,
            endTime:this.endtime,
            startTime:this.starttime,
            type:this.usertype
          }
          api['submit'+this.type](options).then(res=>{
           let {msg}=res;
           if(msg==="提交成功"){
             this.$router.back()
           }else{
             alert(msg)
           }
          })
          
        }
    },
    created(){
   this.getUserInfo();//调用
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
.addpic{
  position: relative;
}
.files{
  opacity: 0;
  position: absolute;
  top:0;
  left: 0;
  height: 100%;
  z-index: 10;
}
.imgBox{
  ul{
    position: relative;
    display: flex;
    li{
      width: pxTorem(103px);
      height: pxTorem(103px);
      display: flex;
      span{
        width:pxTorem(20px);
        height: pxTorem(20px);
        text-align: center;
        line-height: pxTorem(20px);
        background: pink;
        display: inline-block;
        position: absolute;
        right:0;
        top:pxTorem(10px);
      }
      img{
        max-width: 100%;
        max-height: 100%
      }
    }
  }
}
</style>