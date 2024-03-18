<template>
    

    <p class="title pcenter">登入</p>
    <div class="userdiv">
        <div class="userdiv2">
            <div class="userdiv3">
                <div>
                    <label for="username">用戶名:</label>
                    <input type="text" id="username" name="username" v-model="username"><br>
                </div>
                <div>
                    <label for="password">密碼:</label>
                    <input type="text" id="password" name="password" v-model="password">
                </div>
            </div>
            <div class="logregbtn">
                <div >
                <button @click="checklogin" class="logregbtn2 btn">登入</button>
                </div>
                <div >
                <router-link to="/registerview" >
                    <button class="logregbtn2 btn">註冊</button>
                </router-link>
                </div>
            </div>
        </div>
    </div>
    
    <div>
    <router-view></router-view>
    </div>
    

</template>

<script>
import { apiuserLogin } from "../api/api.js";

export default{
    data(){
        return{
            username: "",
            password: "",
            users: []
        }
    },
    methods: {
        async checklogin(){
            try{

                const requestData = {
                    username: this.username,
                    password: this.password
                };

                const response = await apiuserLogin(requestData);
                if (response.status === 200) {
                    // Successful login
                    this.$store.commit('login');//今天增加的
                    // 使用 Vue Router 的编程式导航进行页面跳转

                    localStorage.setItem('user-info', JSON.stringify(response.data));//測試

                    this.$router.push('/productslist');
                    
                } else {
                    // Failed login
                    window.alert('帳號或密碼有錯誤');
                }


            }catch(error){
                console.error(error);
                window.alert('登入失敗，請稍後再試');
            }
        }

    }

}


</script>