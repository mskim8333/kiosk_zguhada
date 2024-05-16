<template>
  <div class="itempage">
    <div class="top_row">
      <img class="top_btn" alt="logo" src="../assets/back.png">
      <img class="top_btn2" alt="logo" src="../assets/home.png">
    </div>
    <h3>품목을 선택해주세요.</h3>
    <h5>배출품목에 없는 경우, 문의 후 선택하여 주시기 바랍니다.</h5>
    
    <div class="ip_row">
      <div>
        <input v-model="addr" maxlength="15" placeholder="배출하실 품목을 입력해 주세요.">
      </div>
    </div>
    
    <div class="cate_row">
      <span class="cate_left">
        <img class="top_btn2" alt="logo" src="../assets/circle_left.png">
      </span>
      <div class="cate_content">
        <button class="active"
        v-for="(item, index) in productList2.categories" 
        :key="index"
        >
          전체
        </button>
        <button class="">가전</button>
        <button class="">생활용품</button>
        <button class="">기타</button>
      </div>
      <span class="cate_right">
        <img class="top_btn2" alt="logo" src="../assets/circle_right.png">
      </span>
    </div>

    <div class="cate_item">
      <div class="cate_item_row">
        <button class="item">
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

    <div class="bottom_content">
      <div class="left_info">
        <div class="info_row">
          <span class="info_title">선택한 품목</span>
          <span class="info_content"><p>3</p>개</span>
        </div>
        <div class="info_row">
          <span class="info_title">결제금액</span>
          <span class="info_content"><p>8,000</p>원</span>
        </div>
      </div>
      <button class="info_btn">선택완료</button>
    </div>
    
  </div>
</template>

<script>
import { getKioskProducts } from '../api/index';

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
      const response = await getKioskProducts(kioskToken, '', '', 1);
      const filteredData = (response).filter(item => item.service_government_id == this.guData.id);
      console.log(filteredData);
      this.productList2 = JSON.parse(JSON.stringify(filteredData));

    } catch (error) {
      console.error('상품 정보를 가져오는 중 오류 발생:', error);
    }
  },
  methods: {
  }, 
};
</script>

<style scoped>
.cate_item {
  margin: 20px 0px 0px;
  border-top: 1px solid #EDEDED;
  border-bottom: 1px solid #EDEDED;
  padding: 20px;
  overflow: hidden;
}
.cate_item_row {
  display: block;
}
.cate_item_row button.item {
  float: left;
  width: 25%;
  text-align: center;
  overflow: hidden;
  background: none;
  border: none;
}
.cate_item_row button.item img {
  width: 80px;
}
.cate_item_row button.item span {
  display: block;
  margin: 10px 0px;
}

.cate_row {
  position: relative;
}
.cate_content {
  text-align: left;
  display:block;
  margin: 10px 60px;
}
.cate_content button {
  border: 1px solid #E4E4E4;
  padding: 10px 24px;
  border-radius: 20px;
  background-color: #FFFFFF;
  color: #2C2C2C;
  font-weight: 400;
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
  left: 10px;
  top: 10px;
}
.cate_right {
  position: absolute;
  right: 10px;
  top: 10px;
}
.left_info {
  float: left;
  width: calc(100% - 160px);
  padding-top: 10px;
}
.info_row {
  clear: both;
  display: block;
}
.info_title {
  color: #2C2C2C;
  font-weight: 600;
  line-height: 24px;
  float: left;
  width: 40%;
  padding-left: 10px;
}
.info_content {
  float: right;
  width: 40%;
  padding-right: 20px;
  line-height: 24px;
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
  width: 160px;
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
  height: 66px;
}
.info_row {
  text-align: left;
  line-height: 30px;
  color: #767676;
}
.info_row span {
  margin-left: 10px;
  font-size: 13px;
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
  height: 1100px;
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
  margin: 0px 0 40px;
}
h3 {
  color: #2C2C2C;
  font-size: 36px;
  margin: 80px 0px 10px;
}
.ip_row {
  margin: 0 40px 20px;
  overflow: hidden;
}
.ip_row div {
  float: left;
  width: 100%;
  background-color: #F5F5F5;
}
.ip_row div input {
  width: 100%;
  padding: 10px;
  border: 0px;
  font-size: 20px;
  color: #767676;
  outline: none;
  background-color: #F5F5F5;
}
</style>
