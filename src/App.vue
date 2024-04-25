<template>
  <SignIn msg="Welcome to Your Vue.js App"/>
</template>

<script>
import SignIn from './components/SignIn.vue'

export default {
  name: 'App',
  components: {
    SignIn
  }
}
</script>

<style>
#app {
  font-family: Pretendard, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
