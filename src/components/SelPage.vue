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
        <button 
          @click="tabClick(-1, -1)"
          :class="{ 'active': selectedIndex === -1 }">
          전체
        </button>
        <button 
          v-for="(item, index) in productList" 
          :key="index" 
          @click="tabClick(item.id, index)"
          :class="{ 'active': selectedIndex === index }"
        >
          {{ item.name }}
        </button>
      </div>
      <span class="cate_right">
        <img class="arrow" alt="logo" src="../assets/circle_right.png">
      </span>
    </div>

    <div class="cate_item">
      <swiper
        :pagination="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide
            v-for="(item, index) in selCategory" 
            :key="index"
        >
          <div class="cate_item_row"
            v-for="(item2, index2) in item" 
            :key="index2"
          >
            <button class="item"
              v-for="(item3, index3) in item2"
              :key="index3"
              @click="() => selProduct(item3)"
            >
              <img alt="logo" :src="require(`../assets/4/svg/${item3.zguhada_icon}.svg`)">
              <span>{{ item3.name }}</span>
            </button>
          </div>
        </swiper-slide>
      </swiper>

      <div class="cate_row_abs">
        <div class="cate_row">
          <span class="cate_left2">
            <img class="arrow" alt="logo" src="../assets/circle_left.png">
          </span>
          <div class="cate_content2">
          </div>
          <span class="cate_right2">
            <img class="arrow" alt="logo" src="../assets/circle_right.png">
          </span>
        </div>
      </div>
    </div>

    <div class="order_list">
      <div class="order_row"
        v-for="(item, index) in orderProducts" 
        :key="index"
      >
        <div class="order_box">
          <span class="order_title">{{ item.name }}</span>
          <div class="order_num">
            <img 
              class="order_plus"
              @click="() => qtyChange(index, 1)"
              src="../assets/plus.png"
            >
            <div class="order_qty">{{ item.qty }}</div>
            <img
              class="order_minus"
              @click="() => qtyChange(index, -1)"
              src="../assets/minus.png"
            >
          </div>
          <div class="order_delete">
            <img src="../assets/closed.png" @click="() => deleteOrder(index)">
          </div>
          <span class="order_amt">{{ comma(item.total) }}원</span>
        </div>
      </div>
    </div>

    <div class="bottom_content">
      <div class="left_info">
        <div class="info_row">
          <span class="info_title">선택한 품목</span>
          <span class="info_content"><p>{{ totalQty }}</p>개</span>
        </div>
        <div class="info_row">
          <span class="info_title">결제금액</span>
          <span class="info_content"><p>{{ comma(totalPrice) }}</p>원</span>
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
        v-for="(item, index) in selCategory2" 
        :key="index"
        class="opa_btn"
        :class="{ 'l_row': selCategory2.length > 4, 'l_row2': selCategory2.length > 8 }"
        @click="() => selProduct(item)"
      >
        <span v-if="!item.price">{{ item.name }}</span>
        <span v-if="item.price" class="order">{{ item.name }}</span>
        <p v-if="item.price" class="order">{{ comma(item.price) }}</p>
      </button>
    </div>
    <div class="opa_close" @click="toggleActive">
      <img src="../assets/closed.png">
    </div>
  </div>
</template>

<script>
import { getKioskProducts2 } from '../api/index';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default {
  name: 'SelPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  props: {
  },
  data() {
    return {
      productList: [], // 상품 리스트를 저장할 변수 추가
      productList2: [], // 상품 리스트를 저장할 변수 추가2
      selCategory: [], // 선택된 카테고리
      selCategory2: [], // 선택된 품목(depth:2~)
      orderProducts: [], // 규격을 선택한 품목
      totalQty: 0, // 선택된 품목수
      totalPrice: 0, // 선택된 품목의 총 금액
      guData: [],
      addr: '',
      isActive: true,
      msg1: '',
      selectedIndex: -1,
    };
  },
  async mounted() {
    try {
      const data = localStorage.getItem('guData');
      if (data) {
        this.guData = JSON.parse(data);
      }
      
      const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
      const response = await getKioskProducts2(kioskToken, '', '', 1, this.guData.id);
      if (response) {      
        this.productList = await response;
        console.log(this.productList);
        this.tabClick(-1, -1);
      }

    } catch (error) {
      console.error('상품 정보를 가져오는 중 오류 발생:', error);
    }
  },
  methods: {
    selProduct(item) {
      console.log(item);
      console.log('클릭');
      if (item.products) {
        //console.log(item.products);
        this.selCategory2 = item.products;
        this.msg1 = item.name + '의 종류를 선택해주세요.';
        this.isActive = false;
      } else if (item.product_standards) {
        //console.log(item.product_standards);
        this.selCategory2 = item.product_standards;
        this.msg1 = '규격을 선택해주세요.';
        this.isActive = false;
      } else if (item.price) {
        console.log('주문 추가');
        const filteredData = (this.orderProducts).filter(order_item => order_item.id == item.id);
        let temp = item;
        temp.qty = 1;
        temp.total = Number(temp.qty) * Number(temp.price);
        if(filteredData.length == 0) {
          (this.orderProducts).push(temp);
        }
        this.calcTotal();
        //console.log(filteredData);
        console.log(this.orderProducts);
        this.isActive = true;
      }
      
    },
    toggleActive() {
      this.isActive = true;
    },
    tempNext() {

      const editPage = localStorage.getItem('editPage');

      if (editPage == 'SelPage') {
        localStorage.setItem('editPage', null);
        localStorage.setItem('orderData', JSON.stringify(this.orderProducts));
        this.$router.push({ name: 'OrderPage' });
      } else {
        localStorage.setItem('orderData', JSON.stringify(this.orderProducts));
        this.$router.push({ name: 'UserPage' });
      }

    },
    tabClick(id, index) {
      this.selectedIndex = index;
      if (id === -1) {
        console.log('전체');
        let arr = [];
        for(const item of this.productList) {
          arr = arr.concat(item.middle_categories);
        }
        console.log(arr);
        let page = this.chunkArray(arr, 4);

        this.selCategory = this.chunkArray(page, 2);
        console.log(this.selCategory);
      } else {
        for(const item of this.productList) {
          if(item.id === id) {
            console.log(item.id);
            console.log(item.name);

            let arr = item.middle_categories;
            let page = this.chunkArray(arr, 4);

            this.selCategory = this.chunkArray(page, 2);
            console.log(this.selCategory);

            break;
          }
        }
      }
    },
    chunkArray(array, size) {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    },
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    qtyChange(idx, num) {
      const price = this.orderProducts[idx].price;
      const qty = this.orderProducts[idx].qty;
      if (qty + num > 0) {
        this.orderProducts[idx].qty = qty + num;
        this.orderProducts[idx].total = (qty + num) * price;

        this.calcTotal();
      } else {
        return false;
      }
    },
    calcTotal() {
      let qty = 0;
      let total = 0;
      for (const item of this.orderProducts) {
        //qty = qty + item.qty;
        qty++;
        total = total + item.total;
      }
      this.totalQty = qty;
      this.totalPrice = total;
    },
    deleteOrder(idx) {
      (this.orderProducts).splice(idx, 1);
      this.calcTotal();
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
  position: relative;
  min-height: 50vw;
  margin: 20px 0px 0px;
  border-top: 1px solid #EDEDED;
  /* border-bottom: 1px solid #EDEDED; */
  padding: 20px;
  overflow: hidden;
}

.cate_item_row {
  display: block;
  overflow: hidden;
  height: 25vw;
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
.cate_row_abs {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 100%;
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
  height: 30px;
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
  min-height: 40%;
  max-height: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border-radius: 5vw;
  z-index: 9999;
  padding-bottom: 30px;
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
.opa_btn.l_row {
  height: 140px;
  line-height: 140px;
  font-size: 28px;
}
.opa_btn.l_row2 {
  height: 100px;
  line-height: 100px;
  font-size: 28px;
}

.opa_btn span {
  margin: 0px;
  padding: 0px;
}
.opa_btn span {
  margin: 0px;
  padding: 0px;
}
span.order {
  display: block;
  text-align: left;
  margin: 10px 0px 0px;
  padding: 10px 0px 10px 20px;
  line-height: 34px;
}
p.order {
  display: block;
  text-align: left;
  line-height: 34px;
  color: #767676;
  padding: 10px 0px 10px 20px;
  margin: 0px;
}
</style>
