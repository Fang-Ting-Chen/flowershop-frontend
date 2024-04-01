<template>
    
    

    <div>
        <p class="title pcenter">Products</p>
        <div class="flex-container-productslist">
            <div>
                <p>商品分類:</p>
                <button v-on:click="allProducts()" class="btn">所有商品</button>
                <button v-on:click="filterByCategory('fresh flower bouquet')" class="btn">鮮花</button>
                <button v-on:click="filterByCategory('dried flower bouquet')" class="btn">乾燥花</button>
            </div>
            <div>
                <p>商品排序:</p>
                <button v-on:click="priceLowToHigh()" class="btn">價格低至高</button>
                <button v-on:click="priceHighToLow()" class="btn">價格高至低</button>
            </div>
        </div>
        <div class="flex-container-products">
            <!--使用 v-for 循環列表時，為每個渲染元素綁上唯一的 key 屬性，可使vue.js更有效的更新和管理元素清單-->
            <form v-for="product in dataShow" :key="product.code">
                <img :src="product.url" alt="product image" >
                <p>{{ product.name }}</p>
                <p>$ {{ product.price }}</p>
                <button type="button" @click="addToCart(product)" class="btn">加入購物車</button>
            </form>
        </div>
        <!--分頁-->
        <div class="pagediv">
            <button @click='prePage' class="btn">上一頁</button>   
            <span v-for='i in pageNum' @click='page(i)' class="btn">{{ i }}</span>
            <button @click='nextPage' class="btn">下一頁</button>
        </div>
    </div>
    
    

</template>


<script>
import { apiProducts } from "../api/api.js";
import { apiProductStock } from "../api/api.js";
import { apiCartAdd } from "../api/api.js";
import { apiCart } from "../api/api.js";
import { apiCartAddNumber } from "../api/api.js";


export default{
    //vue 的 data 屬性用於存儲值
    data(){
        return {
            products: [],
            carts: [],
            /*以下分頁*/
            totalPage: [], //所有分頁的數據
            pageSize: 8, //每頁顯示數量
            dataShow: [], //當前顯示的數據
            currentPage: 0, //默認當前顯示頁面
            pageNum: 0,
            selectedCategory: null,
        };
    },
    //vue 的 method 屬性用於存儲&定義 vue實例的函數
    //method 中需要編寫 this.為前綴來從方法內部引用data屬性中的值
    methods: {
        async getProducts(){
            try {
                const response = await apiProducts();
                this.products = response.data;

                // 在數據加載成功後計算 pageNum
                this.pageNum = Math.ceil(this.products.length / this.pageSize);

                // 使用 $nextTick 延遲設置 dataShow
                this.$nextTick(() => {
                    this.totalPage = []; //所有分頁的數據
                    //給予每一頁數據
                    for (let i = 0; i < this.pageNum; i++){
                        this.totalPage.push(this.products.slice(this.pageSize * i, this.pageSize * (i+1)));
                    }
                this.dataShow = this.totalPage[this.currentPage];
                });

            } catch(error) {
                console.error(error);
                
            }
        },
        async addToCart(product){
            if (product.stock > 0 ){
                //減少庫存
                const updatedStock = product.stock - 1;

                try{
                    //傳遞減少的庫存
                    await apiProductStock(product._id,{ stock: updatedStock });
                    product.stock = updatedStock;

                    //加入購物車
                    const postData = {
                        id: product._id,
                        name: product.name,
                        kind: product.kind,
                        price: product.price,
                        number: 1,
                        url: product.url,
                        code: product.code
                    };
                    const response = await apiCart();
                    
                    this.carts = response.data;
                    
                    const existingCartItem = this.carts.find(item => item.code === product.code);
                    if(!existingCartItem){
                        await apiCartAdd (postData);
                    }else{
                        for(const car of this.carts){
                            if (car.code === product.code){
                                const updatedNumber = car.number += 1 ;
                                await apiCartAddNumber(car._id,{ number: updatedNumber });
                                car.number = updatedNumber;
                            }
                        }
                    }
                    

                }catch(error){
                    console.error(error);
                    if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
            }
                }
            }else{
                window.alert('沒庫存了');
            }

        },
        updatePageData() {
				    this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);
				    this.totalPage = []; //所有分頁的數據
                    //給予每一頁數據
				    for (let i = 0; i < this.pageNum; i++) {
				        this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
				    }
				    this.currentPage = 0; // 切換類别後回到第一頁
				    this.dataShow = this.totalPage[this.currentPage];
				},
        async  priceLowToHigh(){
            //確認是否有先選擇商品分類
            if(this.selectedCategory){
                this.dataShow = this.products.filter(product => {
                    return product.kind && product.kind.includes(this.selectedCategory);
                });

                //幫商品排序
                this.dataShow.sort((a, b) => a.price - b.price);

                this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);
                this.totalPage = [];
                for (let i = 0; i < this.pageNum; i++) {
                    this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
                }
                this.currentPage = 0; // 切換類别後回到第一頁
                this.dataShow = this.totalPage[this.currentPage];
                }else{
                    const response = await apiProducts();
                    this.products = response.data;
                    this.dataShow = this.products;
                    this.dataShow.sort((a, b) => a.price - b.price);
                        
                    this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);
                    this.totalPage = [];
                for (let i = 0; i < this.pageNum; i++) {
                    this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
                }
                this.currentPage = 0; // 切換類别後回到第一頁
                this.dataShow = this.totalPage[this.currentPage];
            }



        },
        async  priceHighToLow(){
            //確認是否有先選擇商品分類
            if(this.selectedCategory){
                this.dataShow = this.products.filter(product => {
                    return product.kind && product.kind.includes(this.selectedCategory);
                });
    
                //幫商品排序
                this.dataShow.sort((a, b) => b.price - a.price);

                this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);
                this.totalPage = [];
                for (let i = 0; i < this.pageNum; i++) {
                    this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
                }
                this.currentPage = 0; // 切換類别後回到第一頁
                this.dataShow = this.totalPage[this.currentPage];
                }else{
                    const response = await apiProducts();
                    this.products = response.data;
                    this.dataShow = this.products;
                    this.dataShow.sort((a, b) => b.price - a.price);
                        
                    this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);
                    this.totalPage = [];
                for (let i = 0; i < this.pageNum; i++) {
                    this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
                }
                this.currentPage = 0; // 切換類别後回到第一頁
                this.dataShow = this.totalPage[this.currentPage];
            }
        },
        async allProducts(){
            this.selectedCategory = null;
            /*this.getProducts();*/

            /*以下測試 */
            const response = await apiProducts();
            this.products = response.data;
            this.dataShow = this.products;
            // 在數據加載成功後計算 pageNum
            this.pageNum = Math.ceil(this.dataShow.length / this.pageSize);

            // 使用 $nextTick 延遲設置 dataShow
            this.totalPage = [];
			for (let i = 0; i < this.pageNum; i++) {
				    this.totalPage.push(this.dataShow.slice(this.pageSize * i, this.pageSize * (i + 1)));
			}
			this.currentPage = 0; // 切換類别後回到第一頁
			this.dataShow = this.totalPage[this.currentPage];

        },
        filterByCategory(category) {
                    //確認所選分類
				    this.selectedCategory = category;
				    // 重新過濾數據
				    this.dataShow = this.products.filter(product => {
				        return product.kind && product.kind.includes(this.selectedCategory);
				    });
                    //分配每一頁數據
				    this.updatePageData();
				},
        //上一頁
        prePage(){
            if (this.currentPage === 0){
                return;
            }
            this.currentPage -= 1;
            this.dataShow = this.totalPage[this.currentPage];
        },
        //下一頁
        nextPage(){
            if (this.currentPage === this.pageNum-1){
                return;
            }
            this.currentPage += 1;
            this.dataShow = this.totalPage[this.currentPage];
        },
        //點擊頁面
        page(i){
            this.currentPage = i-1;
            this.dataShow = this.totalPage[this.currentPage];
        }
    

    },
    created(){
        this.getProducts();
    }
};

</script>


<style>

</style>