<template>
     <div class="dls">
        <h1>欢迎来到星享俱乐部</h1>
        <input type="text" placeholder="手机号" v-model="phone_value">
        <input type="password" placeholder="验证码" v-model="pwd_value">
        <button class="loginbtn" @click="handleLogin">登录/注册</button>
    </div>

</template>
<script>
import request from "../../utils/request"
import api from "../../api/index"
const phonereg=/^1[3579]\d{9}$/;
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            phone_value:"",
            pwd_value:""
        }
    },
    computed:{

    },
    methods:{
        handleLogin(){
            if(phonereg.test(this.phone_value)&&this.pwd_value.trim()!=""){
               api.userlogin({
                    phone:this.phone_value,
                    password:this.pwd_value
                }).then(res=>{
                    window.localStorage.setItem("token",res.token);
                    this.$router.push("/home")
                }).catch(error=>{
                    alert(error.response.data.message)
                })
            }else{
                alert("请输入正确的用户名或密码")
            }
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
.dls {
    width: 100%;
    h1 {
        height: pxTorem(50px);
        box-shadow: #eeeeee pxTorem(3px) pxTorem(5px) pxTorem(8px) pxTorem(5px);
        width: 100%;
        margin-left: pxTorem(10px);
        line-height: pxTorem(50px);
        font-size: pxTorem(20px);
        font-weight: 600;
    }
    input{
        width: 90%;
        height: pxTorem(44px);
        border: 0; 
        margin-top: pxTorem(10px);
        margin-left: pxTorem(10px);
        border-bottom: solid 1px#ccc;
        padding: 0 pxTorem(10px) 0 pxTorem(10px);
        @include sizing;

    }
    .loginbtn{
        margin-top: pxTorem(20px);
        width: 90%;
        height: pxTorem(40px);
        margin-left: pxTorem(16px);
        border-radius: pxTorem(20px);
        border: 0;
        font-size: pxTorem(16px);
        color: #fff;
    }
}
</style>
