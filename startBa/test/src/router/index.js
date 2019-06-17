import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const route=new Router({
   mode:'hash',
  routes: [
   {
     path:"/",
     redirect:"/home"
   },
   {
     path:"/home",
     name:"home",
     meta:{
       title:"加班/休假"
     },
     component:()=>import("@/views/Home")
   },
   {
     path:"/origin",
    name:"origin",
     meta:{
       title:"排序"
     },
     component:()=>import("@/views/Originating")
   },
   {
     path:"/batch",
    name:"batch",
     meta:{
      title:"筛选"
    },
    component:()=>import("@/views/Batch")
   },
   {
     path:"/login",
    name:"login",
     meta:{
      title:"登录"
    },
    component:()=>import("@/views/Login")
   },
   {
     path:"/detail/:type/:id",
     name:"detail",
     meta:{
       title:"申请表"
     },
     props:true,//自动把params放到props里面
     component:()=>import("@/views/Detail")
   },
   {
    path:"/commit/:type",
    name:"commit",
    meta:{
      title:"提交申请表"
    },
    props:true,//自动把params放到props里面
    component:()=>import("@/views/commit")
  }
  ]
})
route.beforeEach((to,from,next)=>{
 document.title=to.meta.title;
 next()
})
export default route;
