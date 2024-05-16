<template>
  <div class="mainpage">
    <div class="mainpage_top">
      <div class="mainpage_bg">
        <img class="bg_logo" alt="logo" src="../assets/bg.png">  
      </div>
      <div class="logo_wrap">
        <img class="logo" alt="logo" src="../assets/main_camp.png">
      </div>
    </div>
    <div class="mainpage_bottom">
      <div class="btn_wrap">
        <router-link class="btn" to="/proc">이 곳을 터치해주세요</router-link>
      </div>
      <h5>대형생활폐기물 배출 방법</h5>
      <div class="icon_wrap">
        <div class="icon_row">
          <div class="icon_1_3">
            <span class="icon_no">01</span>
            <img class="icon_img" src="../assets/icon1.png">
            <div class="icon_txt">배출 위치 입력</div>
          </div>
          <div class="icon_1_3">
            <span class="icon_no">02</span>
            <img class="icon_img" src="../assets/icon2.png">
            <div class="icon_txt">배출 품목 선택</div>
          </div>
          <div class="icon_1_3">
            <span class="icon_no">03</span>
            <img class="icon_img" src="../assets/icon3.png">
            <div class="icon_txt">신청서 작성</div>
          </div>
        </div>

        <div class="icon_row">
          <div class="icon_1_2">
            <span class="icon_no">04</span>
            <img class="icon_img" src="../assets/icon4.png">
            <div class="icon_txt">배출 수수료 결제</div>
          </div>
          <div class="icon_1_2">
            <span class="icon_no">05</span>
            <img class="icon_img" src="../assets/icon5.png">
            <div class="icon_txt">배출 번호 기재</div>
          </div>
        </div>

        <div class="icon_row">
          <div class="icon_1_2">
            <span class="icon_no">06</span>
            <img class="icon_img" src="../assets/icon6.png">
            <div class="icon_txt">폐기물 배출</div>
          </div>
          <div class="icon_1_2" @click="SignOut">
            <span class="icon_no">07</span>
            <img class="icon_img" src="../assets/icon7.png">
            <div class="icon_txt">수거 처리</div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  created() {
    const data = localStorage.getItem('admintoken');
    if (data == null || data == '') {
      this.$router.push({ name: 'SignIn' });
    }

  },
  data() {
    return {
    }
  },
  methods: {
    SignOut () {
      try {
        localStorage.setItem('admintoken', null);
        this.$router.push({ name: 'SignIn' });
      } catch (error) {
        console.error('error', error);
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainpage {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.mainpage_top {
  /*
  background: url(../assets/bg.png);
  background: url(file:///images/assets/bg.png);
  */
  width: 100%;
  height: 45%;
  overflow:hidden;
}
.mainpage_bg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.bg_logo {
  width: 100%;
  height: 100%;
}
.mainpage_bottom {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60%;
  background-color: #FFFFFF;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
h5 {
  margin: 55px 0 15px;
  color: #2C2C2C;
  font-size: 22px;
  font-weight: 600;
}
.icon_wrap {
  height: calc(100% - 130px);
  padding-top:5px;
}
.icon_row {
  overflow: hidden;
  /* background-color: #FFFFFF; */
  margin: 10px 20px;
  height: 33%;
}
.icon_1_3:first-child {
  position: relative;
  float: left;
  width: 33%;
  height: 100%;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.icon_1_3:nth-child(2) {
  position: relative;
  float: left;
  width: calc(34% - 20px);
  height: 100%;
  margin-left: 10px;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.icon_1_3:last-child {
  position: relative;
  float: right;
  width: 33%;
  height: 100%;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.icon_1_2:first-child {
  position: relative;
  float: left;
  width: calc(50% - 5px);
  height: 100%;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.icon_1_2:last-child {
  position: relative;
  float: right;
  width: calc(50% - 5px);
  height: 100%;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.icon_no {
  position: absolute;
  top: 0px;
  left: 10px;
  background-color: #767676;
  padding: 5px;
  color: #FFFFFF;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.icon_img {
  height: 40%;
  margin: 15% 0 10px;
}
.icon_1_3 .icon_img {
  margin-top: 25%;
}
.icon_txt {
  margin-top: 20px;
  font-weight: 600;
}
.logo_wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  text-align:center;
}
img.logo {
  margin: 100px 0 100px;
  width: 80%;
}

.btn_wrap {
  position: absolute;
  top: -40px;
  margin: 0px;
  width: calc(100% - 80px);
  padding: 0px 40px;
}
.btn {
  display: inline-block;
  text-decoration: none;
  background-color: #1E64FF;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 24px;
  width: 100%;
  line-height: 80px;
  height: 80px;
  border: 0px;
}

</style>
