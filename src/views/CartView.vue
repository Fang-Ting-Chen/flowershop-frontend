<template>
    <div class="cartdiv">
        <p class="title pcenter">Shopping Cart</p>
        <div  class="flex-container-products">
        <form v-for="item in carts" :key="item.code">
            <img :src="item.url" alt="product image" class="cartimg">
            <p>商品: {{ item.name }}</p>
            <p>$ {{ item.price }}</p>
            <p>數量: {{ item.number }}</p>
            <div>
                <button type="button" @click="decreaseCartItem(item)" class="btn">-</button>
                <button type="button" @click="addCartItem(item)" class="btn">+</button>
            
            <button type="button" @click="removeCartItem(item)" class="btn">刪除</button>
            </div>
        </form>
        </div>
        
        <div class="orderbtndiv">
        <router-link to="/orderform" >
            <button class="btn">去買單</button>
        </router-link>
        </div>
    </div>

</template>

<script>
import { apiCart, apiCartAddNumber, apiRemove} from "../api/api.js";
import { apiProducts, apiProductStock } from "../api/api.js";

export default {
    data(){
        return{
            products: [],
            carts: [],
        };
    },
    methods: {
        async getCart(){
            try{
                const response = await apiCart();
                this.carts = response.data;
            }catch(error){
                console.error(error);
            }
        },
        async getProducts(){
            try {
                const response = await apiProducts();
                this.products = response.data;
            } catch(error) {
                console.error(error);
                
            }
        },
        async addCartItem(item){
            for( const product of this.products){
                if ( product.code === item.code){
                    if ( product.stock > 0 ){
                        //減少庫存
                        const updatedStock = product.stock - 1;
                        try{
                            //傳遞減少的庫存
                            await apiProductStock(product._id,{ stock: updatedStock });
                            product.stock = updatedStock;
                        }catch(error){
                            console.error(error);
                        }
                        //增加購物車商品數量
                        const updatedNumber = item.number += 1;
                        try{
                            await apiCartAddNumber(item._id,{ number: updatedNumber });
                            item.number = updatedNumber;
                        }catch(error){
                            console.error(error);
                        }
                    }else{
                        window.alert('沒庫存了');
                    }
                }
            }
        },
        async decreaseCartItem(item){
            for( const product of this.products){
                if ( product.code === item.code){
                        //增加庫存
                        const updatedStock = product.stock += 1;
                        try{
                            //傳遞減少的庫存
                            await apiProductStock(product._id,{ stock: updatedStock });
                            product.stock = updatedStock;
                        }catch(error){
                            console.error(error);
                        }
                        //減少購物車商品數量
                        const updatedNumber = item.number -= 1;
                        try{
                            await apiCartAddNumber(item._id,{ number: updatedNumber });
                            item.number = updatedNumber;
                        }catch(error){
                            console.error(error);
                        }
                }
            }
        },
        async removeCartItem(item){ 
            for( const product of this.products){
                if ( product.code === item.code){
                        //增加庫存
                        const updatedStock = product.stock += item.number;
                        try{
                            //傳遞減少的庫存
                            await apiProductStock(product._id,{ stock: updatedStock });
                            product.stock = updatedStock;
                        }catch(error){
                            console.error(error);
                        }
                }
            }
            await apiRemove(item._id);
            //手動從數組中移除商品，解決刪除數據後，頁面沒有即時更新的問題
            //array.splice方法會在本地修改數據，刪除指定索引元素
            const index = this.carts.findIndex(cartItem => cartItem.code === item.code);
            //index !== -1 是為了確保在找到匹配的 item.id 的情况下再執行刪除動作，使用findIndex方法查元素時，如沒找到會返回 -1
            if (index !== -1 ){
                this.carts.splice(index, 1);
            }
        }

    },
    mounted(){
        this.getCart();
        this.getProducts();
    }

}

</script>