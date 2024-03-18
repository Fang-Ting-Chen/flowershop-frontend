<template>
    <p class="title pcenter">訂單資料</p>
    <div  class="orderform">
    <form @submit.prevent="submitForm">
        
        <div>
        <div>
            <label for="ordername">姓名:</label>
            <input type="text" id="ordername" name="ordername" v-model="ordername"><br>
        </div>
        <div>
            <label for="orderphone">電話號碼:</label>
            <input type="tel" id="orderphone" name="orderphone" v-model="orderphone"><br>
        </div>
        <div>
            <label for="orderemail">電子郵件:</label>
            <input type="email" id="orderemail" name="orderemail" v-model="orderemail"><br>
        </div>
        <div>
            <label for="orderaddress">收件地址:</label>
            <input type="text" id="orderaddress" name="orderaddress" v-model="orderaddress"><br>
        </div>
        <div>
            <label for="ordertext">備註:</label>
            <input type="text" id="ordertext" name="ordertext" v-model="ordertext"><br>
        </div>
        </div>
        
        <input type="hidden" name="orderItem" :value="orderItem" ><br>
        <p>總金額: {{ this.totalPrice }}</p>
        <button type="submit" class="btn">確認訂單</button>
    </form>
    </div>

</template>


<script>
import { apiCart, apiRemove, apiOrderInfotmation } from "../api/api.js";

export default{
    data(){
        return{
            carts: [],
            totalPrice: 0,
            ordername: "",
            orderphone: "",
            orderemail: "",
            orderaddress: "",
            ordertext: "",
            orderItem: ""
        };
    },
    methods: {
        async getCart(){
            try{
                const response = await apiCart();
                this.carts = response.data;
            }catch(error){
                console.error(error);
            };

            for(const cart of this.carts){
                this.totalPrice += cart.number * cart.price;

            }
        },
        async submitForm(){
            try{

                await apiOrderInfotmation({
                    name: this.ordername,
                    phone: this.orderphone,
                    email: this.orderemail,
                    address: this.orderaddress,
                    text: this.ordertext,
                    orderitem: this.carts
                });

                for( const item of this.carts){
                    await apiRemove(item._id);
                }
                
                this.totalPrice= 0;
                this.carts = [];
                this.ordername = "";
                this.orderphone = "";
                this.orderemail = "";
                this.orderaddress = "";
                this.ordertext = "";

            }catch(error){
                console.log(error)
            }
            
        }
    },
    created(){
        this.getCart();
    }
}

</script>