import api from "../../api/index"
export default {
    namespaced: true,
    state: {
        //用户信息
        userinfo:{},
    },
    mutations: {
        setuserinfo(state,data){
            console.log(data)
            state.userinfo=data;
        }
    },
    actions: {
        getUserInfo(context){
            //成功要改变userinfo
            // console.log(context)
            api.isLogin().then(res=>{
                // console.log(res.data)
               context.commit("setuserinfo",res.data)
            })
        }
    }
}