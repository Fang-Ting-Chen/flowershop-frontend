<template>
   
    <div class="header-nav">
        
        <label for="switch" class="menulab" @click="toggleDropdown"><img src="/src/assets/images/navbarimg.png" class="phonenavbar" ></label><!--漢堡按鈕圖示-->
        <input type="checkbox" id="switch" class="menuin" v-if="isDropdownVisible"><!--選單開關-->
        
        <img src="/src/assets/images/logo.png" class="logo">
        <ul class="navbar"> <!--選單內容-->
            <li class="dropdown ">
                <a href="javascript:void(0)" class="dropbtn">會員中心</a>
                <div class="dropdown-div">
                    <router-link to="/registerview" class="dropdown-content drop-content" @click="hideDropdown">註冊</router-link>
                    <logout class="dropdown-content drop-content" @click="hideDropdown"/><!--登出-->
                </div>
            </li>
            <li><router-link to="/cartview" class="nav-link drop-content" @click="hideDropdown">
                購物車
                </router-link>
            </li>
            <li><router-link to="/productslist" class="nav-link drop-content" @click="hideDropdown">
                商品列表
                </router-link>
            </li>
            <li ><router-link to="/homeview" class="nav-link drop-content" @click="hideDropdown">
                首頁
                </router-link>
            </li>
        </ul>

    </div>

    <div class="image-slider">
        <img src="/src/assets/images/imgslide1.jpg" alt="imgslide1">
        <img src="/src/assets/images/imgslide2.jpg" alt="imgslide2">
        <img src="/src/assets/images/imgslide3.jpg" alt="imgslide3">

    </div>
  
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownVisible: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    }
  }
};

</script>
