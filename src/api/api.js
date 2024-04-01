import axios from 'axios';


//建立各 API 的 Axios 實例
const cartRequest = axios.create({
    baseURL: 'https://flowershop-backend-fuj2.onrender.com', //後端端口 
    withCredentials: true, //跨域請求 測試
    headers: {
        'Content-Type': 'application/json',
    },
});
const orderinfotmationRequest = axios.create({
    baseURL: 'https://flowershop-backend-fuj2.onrender.com', //後端端口 
    withCredentials: true, //跨域請求 測試
    headers: {
        'Content-Type': 'application/json',
    },
});

const productsRequest = axios.create({
    baseURL: 'https://flowershop-backend-fuj2.onrender.com', //後端端口 
    withCredentials: true, //跨域請求 測試
    headers: {
        'Content-Type': 'application/json',
    },
});
const usersRequest = axios.create({
    //baseURL: domain + '/users' ,
    baseURL: 'https://flowershop-backend-fuj2.onrender.com', //後端端口 
    withCredentials: true, //跨域請求 測試
    headers: {
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
    },
});

/***商品列表***/
//獲取商品數據
export const apiProducts = () => productsRequest.get('/api/products');
//更改商品庫存
export const apiProductStock = (productId,data) => {
    const url = `/api/products/${productId}`;
    return productsRequest.patch(url,data);//data為接受傳遞過來要修改的數據
};

/***購物車***/
//獲取購物車數據
export const apiCart = () => cartRequest.get('/api/cart');
//增添數據到購物車
export const apiCartAdd = (data) => cartRequest.post('/api/cart/add',data);
//更改購物車數據
export const apiCartAddNumber = (productId,data) => {
    const url = `/api/cart/${productId}`;
    return cartRequest.patch(url,data);
};
//刪除購物車數據
export const apiRemove = (productId) => {
    const url = `/api/cart/${productId}`;
    return cartRequest.delete(url);
};

/***下訂單***/
//確認訂單，增加訂單信息
export const apiOrderInfotmation = (data) => orderinfotmationRequest.post('/api/orderinfo',data);

/***會員***/
export const apiusers = (data) => usersRequest.post('/api/user/register',data);  //註冊
export const apiuserLogin = (data) => usersRequest.post('/api/user/login',data);  //登入
export const apiuserLogout = (data) => usersRequest.post('/api/user/logout',data);  //登出
