import Axios from "axios"
import router from "../router"
const request=Axios.create({
   baseURL:'http://localhost:3000'
});//基于Axios对象创建的新对象

//添加请求拦截器
request.interceptors.request.use((config)=>{
    return {
        ...config,
        headers:{
            ...config.headers,
            token:window.localStorage.getItem("token")
        }
    }
},(error)=>{
    return Promise.reject(error);
});

//响应之前拦截
request.interceptors.response.use((respose)=>{
    //成功
    return respose.data;
},(error)=>{
    //失败
    const response=error.response;
    const status=response.status;
    if(status>400){
        switch(status){
            case 401://未登录
            router.push("/login");
            break;
            case 404:
            console.log("页面丢失")
            break;
            case 405:
            console.log("没有权限")
            break;
            default:
            console.log("网络出现错误")
        }
    }
    return Promise.reject(error);
})
export default {
    get(url,data){
        return request.get(url,{
           params:data 
        })   
    },
    post(url,data){
        return request.post(url,data)
    }
}




