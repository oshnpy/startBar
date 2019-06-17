<template>
    <div>
        排序
        {{userinfo}}
    </div>
</template>
<script>
import request from '../../utils/request';
import {mapActions,mapState} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState("user",["userinfo"])
    },
    methods:{
        ...mapActions("user",["getUserInfo"])
    },
    created(){
        // console.log(this.$store)
        this.getUserInfo()
        // this.$store.dispatch("user/getUserInfo")
    },
    mounted(){

    }
   
    
}
</script>
<style scoped lang="">

</style>