import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'

import App from './App.vue'
import store from './store/index'

import ProductsList from './views/ProductsList.vue'
import CartView from './views/CartView.vue'
import OrderForm from './views/OrderForm.vue'
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import UserLogout from './components/UserLogout.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HomeView from './views/HomeView.vue'



//創建 vue-router 的實例
const router = createRouter({
    history: createWebHistory(),
    //配置路由規則
    routes: [
        //path: 用於自訂 url 末尾  ，component: 用於設定要打開的元件
        { path: '/productslist', component: ProductsList, name: 'productslist'},
        { path: '/cartview', component: CartView, name: 'cartview'},
        { path: '/orderform', component: OrderForm, name: 'orderform'},
        { path: '/loginview', component: LoginView, name: 'loginview'},
        { path: '/registerview', component: RegisterView, name: 'registerview'},
        { path: '/homeview', component: HomeView, name: 'homeview'}  
    ]
});





//創建 vue 的實例
const app = createApp(App)

app.use(router); //將router掛載到app實例對象上
app.use(store);

//component 可將部分模板、程式碼封裝起來以便開發者維護以及重複使用
app.component('header-nav',Header)
app.component('logout',UserLogout)
app.component('footer-com',Footer)

// 全局前置守卫，確認是否登入
router.beforeEach((to, from, next) => {
    const authToken = localStorage.getItem('user-info');
    if (to.name === 'registerview') {
        next();
    }else if(to.name !== 'loginview' && !store.state.isLogin && !authToken){
        next({ name: 'loginview' }); 
    }else {
        next();
    }
});


app.mount('#app');
/*
將 app 實例掛載到 HTML 中的 #app 元素上，
以便將其安裝在“index.html”內的<div id="app">標籤上，
這樣vue的app實例就可以開始運行
 */