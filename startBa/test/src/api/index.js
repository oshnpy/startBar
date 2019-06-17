//统一管理接口文件
import request from "../utils/request"
const api={
    //api/user/info  用来获取用户是否登录
    isLogin(){
        return request.get("/api/user/info")
    },
    //用户登录 /api/login
    userlogin:(data)=>request.post("/api/login",data),
    //api/task/list 首页数据
    taskList:(data)=>request.get("/api/task/list",data),
    //获取加班详情
    overtimeDetail:(data)=>request.get("/api/apply/overtime",data),
    //获取休假详情
    vacationDetail:(data)=>request.get("/api/apply/vacation",data),
    //发送图片
    submitFile:(filedata)=>request.post("/api/upload",filedata),
    //提交加班
    submitovertime:(data)=>request.post("/api/apply/overtime",data),
     //提交休假
    submitvacation:(data)=>request.post("/api/apply/vacation",data)
}
export default api;