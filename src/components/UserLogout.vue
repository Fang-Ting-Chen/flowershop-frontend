<template>
    <a href="#" @click="logout">登出</a>
</template>


<script>
import { apiuserLogout} from "../api/api.js";
export default{
    data(){
        return{

        }
    },
    methods: {
        async logout(){
            sessionStorage.removeItem('user-info') //刪除客戶端的會話相關數據
            await apiuserLogout();
            this.$store.commit('logout');
            // 使用 Vue Router 的编程式导航进行页面跳转
            this.$router.push('/loginview');
        }
    }
    
    
}

</script>