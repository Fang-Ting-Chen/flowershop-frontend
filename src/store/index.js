//安裝導入 vuex 並匯入 createStore 方法，實現實現不同組件間共享狀態的工具
import { createStore } from 'vuex';



//state、mutations、actions、getters 是 Vuex 中的核心概念，他們共同構建了vuex的架構
export default createStore({
    /*vuex 的屬性 state，:
    *1、為響應式的資料狀態儲存, 資料狀態變化時，有用到的 component 都會即時更新
    *2、component 可從 store 中讀取資料狀態(state)
    *3、修改 store 中的 state 資料順序(建議): dispatch -> [action] -> commit -> [mutation]
    */
    state(){
        return{
            isLogin: false
        }
    },
    /*vuex 的屬性 mutations:
    *1、改變state(只有mutation才能更新state)
    *2、只處理同步函數：不要在這進行非同步的動作
    *3、mutation 內將 action commit 進來的資料傳給 state （修改 state）
     */
    mutations: {
        /*mutations 函数默认接收两个参数：state(第一個參數) 和 payload(第二個參數):
        *state: 表示当前的状态对象，即 store 中的状态。
        *payload: 用于传递数据的载荷，可以是单一的值或包含多个字段的对象。
        *一般情况下，mutations 函数的目的是修改 state，通过传递 payload 中的数据来改变状态。
        */
       login(state){
        state.isLogin = true;
       },
       logout(state){
        state.isLogin = false;
       },

    }
});