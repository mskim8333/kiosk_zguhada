<template>
  <div class="itempage">
    <div class="top_row">
      <router-link to="/addr3">
        <img class="top_btn" alt="logo" src="../assets/back.png">
      </router-link>
      <router-link to="/">
        <img class="top_btn2" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <h3>품목을 선택해주세요.</h3>
    <h5>배출품목에 없는 경우, 문의 후 선택하여 주시기 바랍니다.</h5>
    
    <div class="ip_row">
      <div class="ip_input_wrap">
        <input v-model="addr" maxlength="15" readonly placeholder="배출하실 품목을 입력해 주세요.">
        <img class="sc_icon" alt="search" src="../assets/search_g.png">
      </div>
    </div>
    
    <div class="cate_row">
      <span class="cate_left">
        <img class="arrow" alt="logo" src="../assets/circle_left.png">
      </span>
      <div class="cate_content">
        <button class="active">
          전체
        </button>
        <button class="">가구</button>
        <button class="">가전제품</button>
        <button class="">생활용품</button>
        <button class="">사무/업소용품</button>
        <button class="">스포츠/취미용품</button>
        <button class="">유아/아동용품</button>
        <button class="">기타</button>
      </div>
      <span class="cate_right">
        <img class="arrow" alt="logo" src="../assets/circle_right.png">
      </span>
    </div>

    <div class="cate_item">
      <div class="cate_item_row">
        <button class="item" @click="() => selProduct()">
          <img alt="logo" src="../assets/p1.png">
          <span>장롱/옷장</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p2.png">
          <span>소파</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p3.png">
          <span>장식장/진열장</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p4.png">
          <span>옷장</span>
        </button>
      </div>
      <div class="cate_item_row">
        <button class="item">
          <img alt="logo" src="../assets/p5.png">
          <span>화장대/협탁</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p6.png">
          <span>싱크대/선반</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p7.png">
          <span>조명</span>
        </button>
        <button class="item">
          <img alt="logo" src="../assets/p8.png">
          <span>서랍정/수납장</span>
        </button>
      </div>
    </div>

    <div class="cate_row">
      <span class="cate_left2">
        <img class="arrow" alt="logo" src="../assets/circle_left.png">
      </span>
      <div class="cate_content2">
        <img class="dot" alt="logo" src="../assets/dot_active.png">
        <img class="dot" alt="logo" src="../assets/dot.png">
        <img class="dot" alt="logo" src="../assets/dot.png">
      </div>
      <span class="cate_right2">
        <img class="arrow" alt="logo" src="../assets/circle_right.png">
      </span>
    </div>

    <div class="order_list">
      <div class="order_row">
        <div class="order_box">
          <span class="order_title">돗자리/모든규격</span>
          <div class="order_num">
            <img class="order_plus" src="../assets/plus.png">
            <div class="order_qty">1</div>
            <img class="order_minus" src="../assets/minus.png">
          </div>

          <div class="order_delete">
            <img src="../assets/closed.png">
          </div>
          <span class="order_amt">3,000원</span>
          
        </div>
      </div>

      <div class="order_row">
        <div class="order_box">
          <span class="order_title">방충망/소</span>
          <div class="order_num">
            <img class="order_plus" src="../assets/plus.png">
            <div class="order_qty">1</div>
            <img class="order_minus" src="../assets/minus.png">
          </div>

          <div class="order_delete">
            <img src="../assets/closed.png">
          </div>
          <span class="order_amt">5,000원</span>
          
        </div>
      </div>
      
    </div>

    <div class="bottom_content">
      <div class="left_info">
        <div class="info_row">
          <span class="info_title">선택한 품목</span>
          <span class="info_content"><p>0</p>개</span>
        </div>
        <div class="info_row">
          <span class="info_title">결제금액</span>
          <span class="info_content"><p>0</p>원</span>
        </div>
      </div>
      <button class="info_btn" @click="tempNext">선택완료</button>
    </div>
    
  </div>
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive }">
    <div class="opa_alert_top">
      <span>{{ msg1 }}</span>
      <button 
        class="opa_btn">
        자개장롱
      </button>
      <button 
        class="opa_btn">
        장롱
      </button>
    </div>
    <div class="opa_close" @click="toggleActive">
      <img src="../assets/closed.png">
    </div>
  </div>
</template>

<script>
import { getKioskProducts2 } from '../api/index';

export default {
  name: 'SelPage',
  props: {
  },
  data() {
    return {
      productList: [], // 상품 리스트를 저장할 변수 추가
      productList2: [], // 상품 리스트를 저장할 변수 추가2
      guData: [],
      addr: '',
      isActive: true,
      msg1: '',
    };
  },
  async mounted() {
    try {
      const data = localStorage.getItem('guData');
      console.log(data);
      if (data) {
        this.guData = JSON.parse(data);
        console.log(this.guData.id);
      }
      
      const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
      const response = await getKioskProducts2(kioskToken, '', '', 1, this.guData.id);
      const filteredData = (response).filter(item => item.service_government_id == this.guData.id);
      console.log(filteredData);
      this.productList2 = JSON.parse(JSON.stringify(filteredData));

    } catch (error) {
      console.error('상품 정보를 가져오는 중 오류 발생:', error);
    }
  },
  methods: {
    selProduct() {
      console.log('클릭');
      this.msg1 = '장롱의 종류를 선택해주세요.';
      this.isActive = false;
    },
    toggleActive() {
      this.isActive = true;
    },
    tempNext() {
      this.$router.push({ name: 'UserPage' });
    }
  }, 
};
</script>

<style scoped>
.order_box {
  margin: 5px 40px ;
  background-color: #FFFFFF;
  border: 1px solid #EDEDED;
  border-radius: 5px;
  padding: 30px;
  overflow: hidden;
}
.order_title {
  float: left;
  width: 40%;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
}
.order_num {
  position: relative;
  float: left;
  width: 25%;
}
.order_amt {
  float: right;
  width: 25%;
  text-align: right;
  font-size: 20px;
  font-weight: 600;
}
.order_plus {
  display: inline-block;
  width: 30px;
  margin-right: 60px;
}
.order_minus {
  display: inline-block;
  width: 30px;
}
.order_qty {
  position: absolute;
  left: calc(50% - 30px);
  top: 0px;
  width: 60px;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
}
.order_delete {
  float: right;
  width: 10%;
  text-align: right;
}
.order_delete img {
  width: 30px;
}
.order_list {
  position: fixed;
  top: 1100px;
  bottom: 30px;
  left: 0px;
  background-color: #F5F5F5;
  width: 100%;
  padding-top: 20px;
}
.cate_item {
  margin: 20px 0px 0px;
  border-top: 1px solid #EDEDED;
  /* border-bottom: 1px solid #EDEDED; */
  padding: 20px;
  overflow: hidden;
}

.cate_item_row {
  display: block;
  overflow: hidden;
}

.cate_item_row button.item {
  float: left;
  width: 25%;
  text-align: center;
  overflow: hidden;
  background: none;
  border: none;
  margin: 0px;
  padding: 0px;
}

.cate_item_row button.item img {
  width: 70%;
  margin: 0px;
  padding: 0px;
}

.cate_item_row button.item span {
  display: block;
  margin: 0px 0px 50px;
  font-weight: 600;
}

.cate_row {
  position: relative;
}
.cate_content {
  text-align: left;
  display:block;
  margin: 10px 80px;
}
.cate_content2 {
  text-align: center;
  display:block;
  margin: 10px 80px;
}
.cate_content2 img {
  width: 10px;
  margin: 4px;
}
.cate_content button {
  border: 1px solid #E4E4E4;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #FFFFFF;
  color: #2C2C2C;
  font-weight: 600;
  margin: 0px 5px;
}
.cate_content button.active {
  border: 1px solid #1E64FF;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #1E64FF;
  color: #FFFFFF;
  font-weight: 600;
}
.cate_left {
  position: absolute;
  left: 40px;
  top: 5px;
}
.cate_right {
  position: absolute;
  right: 40px;
  top: 5px;
}
.cate_left2 {
  position: absolute;
  left: 40px;
  top: 0px;
}
.cate_right2 {
  position: absolute;
  right: 40px;
  top: 0px;
}

.cate_left img {
  width: 30px;
}

.cate_right img {
  width: 30px;
}

.cate_left2 img {
  width: 30px;
}

.cate_right2 img {
  width: 30px;
}

.left_info {
  float: left;
  width: calc(100% - 240px);
  padding-top: 10px;
}
.info_row {
  clear: both;
  display: block;
}
.info_title {
  color: #2C2C2C;
  font-weight: 600;
  line-height: 34px;
  float: left;
  width: 40%;
  padding-left: 10px;
}
.info_content {
  float: right;
  width: 40%;
  padding-right: 20px;
  line-height: 34px;
  text-align: right;
  color: #2C2C2C;
  font-weight: 600;
}
.info_content p {
  display: inline;
  color: #1E64FF;
  font-weight: 600;
}
.info_btn {
  float: right;
  border: none;
  background-color: #1E64FF;
  color: #FFFFFF;
  font-weight: 600;
  height: 100%;
  width: 240px;
  font-size: 16px; 
}
.bottom_content {
  overflow: hidden;
  border-top: 1px solid #E4E4E4;
  background-color: #EDEDED;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 86px;
  z-index: 999;
}
.info_row {
  text-align: left;
  line-height: 30px;
  color: #767676;
}
.info_row span {
  margin-left: 10px;
  font-size: 18px;
}
.info_box {
  background-color: #F5F5F5;
  margin: 0px 30px;
  padding: 30px 20px;
  border-radius: 5px;
}
.info_txt {
  color: #767676;
  font-size: 14px;
  text-align: left;
  margin: 10px 30px;
}
.icon_row {
  display: block;
  text-align: left;
  margin: 0 30px 10px;
}
.tip {
  display: inline-block;
  background-color: #EAF2FF;
  padding: 3px 8px;
  color: #2960E8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.itempage {
  width: 100%;
  height: 100%;
  overflow:hidden;
  background-color: #FFFFFF;
}
.temppage_bottom {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 550px;
}
img.logo {
  margin: 180px 0 20px;
  width: 25%;
}
h5 {
  color: #2C2C2C;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
.msg {
  line-height: 30px;
  color: #767676;
}
.msg span {
  display: block;
  font-weight: 600;
}
.bottom_msg {
  position: absolute;
  bottom: 30px;
  width: calc(100% - 40px);
  margin: 0 0 0 20px;
  padding: 10px 0px;
  background-color: #FFFFFF;
  border-radius: 10px;
  color: #767676;
  line-height: 30px;
}
.bottom_msg span {
  display: block;
  margin-left: 20px;
  font-weight: 400;
  text-align: left;
  font-size: 13px;
}
.key_row {
  overflow: hidden;
}
.key {
  display: inline-block;
}
.key_btn {
  display: inline-block;
  border: 0px;
  background-color: #F5F5F5;
  color: #767676;
  font-weight: 600;
  font-size: 17px;
  border-radius: 5px;
  margin: 4px;
  width: 38px;
  height: 45px;
}
.key_btn img {
  height: 20px;
}
.key_icon {
  width: 48px;
}
.key_space {
  width: 300px;
}
.top_row {
  overflow: hidden;
  margin: 20px 0;
}
.top_btn {
  float: left;
  width: 10px;
  margin: 0 20px;
}
.top_btn2 {
  float: right;
  width: 20px;
  margin: 0 20px;
}
h5 {
  color: #767676;
  font-size: 30px;
  font-weight: 400;
  margin: 0px 0 80px;
}
h3 {
  color: #2C2C2C;
  font-size: 36px;
  margin: 120px 0px 10px;
}
.ip_row {
  margin: 0 40px 40px;
  overflow: hidden;
}
.ip_row div.ip_input_wrap {
  position: relative;
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #F5F5F5;
  border-radius: 10px;
}
.ip_row div.ip_input_wrap img {
  position: absolute;
  left: 14px;
  top: 10px;
  width: 28px;
}
.ip_row div input {
  width: calc(100% - 60px);
  height: 30px;
  line-height: 30px;
  margin-left: 40px;
  padding: 10px;
  border: 0px;
  font-size: 20px;
  color: #767676;
  outline: none;
  background-color: #F5F5F5;
}
.opa_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: #000000;
  opacity: 0.5;
  z-index: 9998;
}
.opa_alert {
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 40%;
  left: 15%;
  top: 32%;
  background-color: #FFFFFF;
  border-radius: 4%;
  z-index: 9999;
}
.opa_alert_top {
  width: 100%;
  height: 100%;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
}
.opa_alert_top img {
  display: inline-block;
  margin: 15% 0 20px 0;
}
.opa_alert_top span {
  display: block;
  margin: 15% 0 60px 0;
}
.opa_close {
  position: absolute;
  right: 30px;
  top: 30px;
}
.opa_close img {
  width: 30px;
}
.opa_hide {
  display: none;
}
.opa_btn {
  width: calc(100% - 100px);
  height: 180px;
  line-height: 180px;
  text-align: center;
  font-size: 34px;
  border: 2px solid #E4E4E4;
  border-radius: 10px;
  background-color: #FFFFFF;
  color: #2C2C2C;
  font-weight: 400;
  margin: 10px 0;
}
</style>
