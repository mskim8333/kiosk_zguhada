<template>
  <div class="signin">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <div class="ip_row">
      <span>토큰</span>
      <div>
        <input v-model="token" maxlength="15" placeholder="토큰값을 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>아이디</span>
      <div>
        <input v-model="id" maxlength="15" placeholder="아이디를 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>비밀번호</span>
      <div>
        <input type="password" maxlength="15" v-model="pass" placeholder="비밀번호를 입력해주세요.">
      </div>
    </div>
    <div class="btn_wrap">
      <button class="btn" @click="val_ck()">로그인</button>
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
  },
  data() {
    return {
      ck_token : false,
      ck_id : false,
      ck_pass : false,
      token: '',
      id: '',
      pass: '',
    }
  },
  methods: {
    val_ck() {
      if (!this.token) {
        alert("토큰을 입력해주세요!");
        return false;
      }
      if (!this.id) {
        alert("아이디를 입력해주세요!");
        return false;
      }
      if (!this.pass) {
        alert("비밀번호를 입력해주세요!");
        return false;
      }
    }
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
  height: 36px;
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
.ip_row div input[type=password] {
  width: 100%;
  padding: 0px 10px 4px;
  border: 0px;
  font-size: 36px;
  color: #2C2C2C;
  letter-spacing: 5px;
  outline: none;
}
.ip_row div input::placeholder {
  color: #B4B4B4;
}
.ip_row div input[type=password]::placeholder {
  color: #B4B4B4;
  font-size: 20px;
  letter-spacing: 0px;
  vertical-align: middle;
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
