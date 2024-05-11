<template>
  <div class="addrpage">
    <div class="top_row">
      <router-link to="/">
        <img class="top_btn" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <h5>대형생활폐기물 배출을 위해</h5>
    <h3>배출하실 주소를 입력해주세요.</h3>
    <div class="ip_row">
      <div>
        <input v-model="addr" maxlength="15" placeholder="주소를 입력해주세요.">
      </div>
    </div>
    <div class="addr_wrap">
      <div class="addr_box" v-for="box in 2" :key="box">
        <div class="addr_row" v-for="row in 2" :key="row">
          <span>도로명</span>
          <p>서울 강남구 가로수길5</p>
        </div>
      </div>
    </div>
    <div class="bottom_content">
      <div class="btn_wrap">
        <router-link to="/addr3" class="btn">다음</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addr_wrap {
  display: block;
  margin: 20px 40px 20px;
}
.addr_box {
  border: 1px solid #E4E4E4;
  border-radius: 10px;
  padding: 10px 25px;
  margin: 8px 0px;
}
.addr_row {
  display: block;
  text-align: left;
  line-height: 20px;
}
.addr_row span {
  display: inline-block;
  color: #1E64FF;
  border: 1px solid #C6DEFF;
  border-radius: 3px;
  padding: 2px 4px;
}
.addr_row p {
  display: inline-block;
  color: #767676;
  margin-left: 10px;
}
.bottom_content {
  position: fixed;
  bottom: 20px;
  left: 0px;
  width: 100%;
}
.btn_wrap {
  margin: 10px 26px;
}
.btn {
  text-decoration: none;
  display:block;
  background-color: #1E64FF;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 20px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border: 0px;
}
</style>

<script>
export default {
  name: 'AddrPage',
  props: {
    msg: String
  },
  data() {
    return {
      addr: '강남 신사동 537',
    };
  }
};
</script>
