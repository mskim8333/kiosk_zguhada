<template>
  <div class="signin">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <div class="ip_row">
      <span>토큰</span>
      <div>
        <input v-model="token" placeholder="토큰값을 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>아이디</span>
      <div>
        <input v-model="id" placeholder="아이디를 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>비밀번호</span>
      <div>
        <input v-model="pass" placeholder="비밀번호를 입력해주세요.">
      </div>
    </div>
    <div class="btn_wrap">
      <button class="btn">로그인</button>
    </div>
    <div class="info">
      <div class="bline">기기 고장 및 AS/사용법 문의</div>
      <div class="rline">지구하다 고객센터 1234-1234</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  position: fixed;
  bottom: 35px;
  width: 100%;
}
.info .bline {
  font-size: 14px;
  font-weight: 600;
  color: #767676;
  line-height: 26px;
}
.info .rline {
  font-size: 14px;
  color: #767676;
  line-height: 26px;
}
img.logo {
  margin: 120px 0 100px;
  width: 50%;
}
.ip_row {
  margin: 0 30px 20px;
  overflow: hidden;
}
.ip_row span {
  float: left;
  width: 20%;
  padding: 10px 0;
  font-size: 20px;
  text-align: left;
  color: #2C2C2C;
}
.ip_row div {
  float: right;
  width: 80%;
  border-bottom: 2px solid #E4E4E4;
}
.ip_row div input {
  width: 100%;
  padding: 10px;
  border: 0px;
  font-size: 20px;
  color: #767676;
  outline: none;
}
.ip_row div input::placeholder {
  color: #B4B4B4;
}
.btn_wrap {
  margin: 60px 26px;
}
.btn {
  background-color: #1E64FF;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 20px;
  width: 100%;
  height: 60px;
  border: 0px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
