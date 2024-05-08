<template>
  <!--<TempPage msg="Welcome to Your Vue.js App"/>-->
  <!--<ProcPage msg="Welcome to Your Vue.js App"/>-->
  <!--<MainPage msg="Welcome to Your Vue.js App"/>-->
  <!--<SignIn msg="Welcome to Your Vue.js App"/>-->
  <!--<AddrPage />-->
  <!--<ItemPage />-->
  <!--<UserPage2 />-->
  <!--<UserPage />-->
  <!--<SelPage />-->
  <OrderPage />
</template>

<script>
//import SignIn from './components/SignIn.vue'
//import MainPage from './components/MainPage.vue'
//import ProcPage from './components/ProcPage.vue'
//import TempPage from './components/TempPage.vue'
//import AddrPage from './components/AddrPage.vue'
//import ItemPage from './components/ItemPage.vue'
//import UserPage2 from './components/UserPage.vue'
//import UserPage from './components/UserPage2.vue'
//import SelPage from './components/SelPage.vue'
import OrderPage from './components/OrderPage.vue'

export default {
  name: 'App',
  components: {
    //SignIn,
    //MainPage,
    //ProcPage,
    //TempPage,
    //AddrPage,
    //ItemPage,
    //UserPage2,
    //UserPage, 
    OrderPage
  }
}
</script>

<style>
html, body {
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
#app {
  font-family: Pretendard, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.v-application {
  font-family: 'Pretendard', sans-serif !important;
}
@font-face {
  font-family:'Pretendard';
  src: url('assets/font/Pretendard-Regular.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'Pretendard';
  src: url('assets/font/Pretendard-Light.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'Pretendard';
  src: url('assets/font/Pretendard-Bold.ttf') format('truetype');
  font-weight: 700;
}
</style>
