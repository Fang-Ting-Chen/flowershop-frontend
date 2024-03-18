<template>
    <p class="title pcenter">註冊</p>
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
                <div>
                    <button @click="registerForm" class="logregbtn2 btn">註冊</button>
                </div>
                
                <div>
                    <!-- 用vue-router中的<router-link>組件替換按鈕，to=’ ’中間的url為在 router 中的 path 自訂的 url 末端名稱 -->
                    <router-link to="/loginview" >
                        <button class="logregbtn2 btn" >登入</button>
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

import { apiusers } from "../api/api.js";

export default{
    data(){
        return{
            username: "",
            password: ""
        }
    },
    methods: {
        /*
        async registerForm(){
            try{
                await apiusers({
                username: this.username,
                password: this.password
                })

                this.username= "",
                this.password= ""

            }catch(error){
                console.error(error);
            }
        }
        */
        async registerForm(){
        try{
            const requestData = {
                username: this.username,
                password: this.password
            };
            //如果你的请求体数据是一个对象，Axios 会默认将其转换为 JSON 字符串。
            //await apiusers(requestData);  正確的

            const response = await apiusers(requestData); 

            if( response.status === 200 ){
                window.location.href = 'http://localhost:5173/loginview';
            } else {
                window.alert('帳號或密碼已被註冊過');
            }



            this.username= "";
            this.password= "";

            //頁面跳轉
            //window.location.href = 'http://localhost:5173/loginview';  正確的



        } catch(error){
            //console.error(error);
            console.error('An error occurred:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
            window.alert('帳號或密碼已被註冊過');
        }
}


    }

}

</script>