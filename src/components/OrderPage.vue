<template>
  <div class="itempage">
    <div class="top_row">
      <router-link to="/user2">
        <img class="top_btn" alt="logo" src="../assets/back.png">
      </router-link>
      <router-link to="/">
        <img class="top_btn2" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <h3>배출신고</h3>
    <h5>신청하신 아래 정보를 확인해 주세요.</h5>
    
    <div class="card">
      <div class="card_title">
        <p>신청인</p>
        <span>{{ userName }}</span>
        <img class="top_btn" src="../assets/arrow_right.png" @click="editContents('UserPage')">
      </div>
    </div>
    <div class="card">
      <div class="card_title">
        <p>연락처</p>
        <span>{{ userTel }}</span>
        <img class="top_btn" src="../assets/arrow_right.png" @click="editContents('UserPage2')">
      </div>
    </div>
    <div class="card">
      <div class="card_title">
        <p>주소지</p>
        <span></span>
        <img class="top_btn" src="../assets/arrow_right.png" @click="editContents('AddrPage')">
      </div>
      <div class="card_content">
        {{ addr }} {{ userAddr2 }}
      </div>
    </div>
    <!--
    <div class="card">
      <div class="card_title">
        <p>배출 일자</p>
        <span>2024-04-01</span>
        <img class="top_btn" src="../assets/arrow_right.png">
      </div>
    </div>
    -->
    <div class="card">
      <div class="card_title">
        <p>배출품목</p>
        <span></span>
        <img class="top_btn" src="../assets/arrow_right.png" @click="editContents('SelPage')">
      </div>

      <div 
        class="card_content2"
        v-for="(item, index) in orderProducts" 
        :key="index"
      >
        <div class="left_content">{{ item.name }}</div>
        <div class="right_content">
          <span>{{ item.qty }}개</span>
          <p>{{ comma(item.total) }}</p>
        </div>
      </div>

    </div>

    <div class="bottom_content">
      <div class="left_info">
        <div class="info_row">
          <span class="info_title">결제금액</span>
          <span class="info_content"><p>{{ comma(total) }}</p>원</span>
        </div>
      </div>
      <button class="info_btn" @click="procPay">결제</button>
    </div>
    
  </div>
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive }">
    <div class="opa_alert_top">
      <span>{{ msg1 }}</span>
      <button 
        class="opa_btn">
        
      </button>
      <button 
        class="opa_btn">
        
      </button>
    </div>
    <div class="opa_close" @click="toggleActive">
      <img src="../assets/closed.png">
    </div>
  </div>
</template>



<script>
import { createLargeWasteRequest, createPaymentRequest, createPaymentApprove } from '../api/index';

export default {
  name: 'AddrPage',
  props: {
  },
  data() {
    return {
      addr: null,
      userName: null,
      userTel: null,
      userAddr: null,
      userAddr2: null,
      guData: [],
      orderProducts: [],
      qty: 0,
      total: 0,
      serGovId: null,
      approve_data: {},
      pay_data: {
        "app": "zguhada",
        "amount": 0,
        "item_title": null,
        "buyer_name": null,
        "buyer_tel": null,
        "tax_free": 0,
        "installment": 99,
        "v_bank_exp": null,
        "cp_ci": 0,
        "buyer_email": null,
        "finish_url": null,
        "wb_success_scheme": null,
        "wb_error_scheme": null,
        "is_mobile": false
      },
      api_data: {
        "name": "",
        "cellphone": "",
        "postcode_json": {},
        "detail_address": "",        
        "dispose_location_id": 0,
        "registered_location_id": 0,
        "payment_method": "CD",
        "channel": "zg_kiosk",
        "dispose_date": "2024-05-28",
        "item_list": [],
        "upload_images": [],
        "payment_id": null,
        //"dispose_memo": "",
        //"complain_type": "ID",
        //"complain_memo": "string",
        //"complain_before_image_id": "string",
        //"complain_after_image_id": "string",
        //"cash_receipt_type": 0,
        //"cash_receipt_number": ""
      }
    };
  },
  mounted() {

    const selData = JSON.parse(localStorage.getItem('selData'));
    const selData2 = localStorage.getItem('selData2');
    const guData = JSON.parse(localStorage.getItem('guData'));
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    const nameData = localStorage.getItem('userName');
    const telData = localStorage.getItem('userTel');

    console.log(guData);

    this.userAddr = selData;
    this.userAddr2 = selData2;
    this.userName = nameData;
    
    this.userTel = telData;
    this.guData = guData;
    this.orderProducts = orderData;

    let item_list = [];

    for(const temp_item of orderData) {
      let temp_arr = {
        product_standard_id: temp_item.id,
        quantity: temp_item.qty,
        unit_price: temp_item.price,
      }
      item_list.push(temp_arr);
    }

    if (selData.address.address_name) {
      this.addr = selData.address.address_name;
    }

    this.api_data.name = nameData;
    this.api_data.cellphone = telData;
    this.api_data.postcode_json = selData;
    this.api_data.detail_address = selData2;        
    this.api_data.dispose_location_id = null;
    this.api_data.registered_location_id = null;
    this.api_data.payment_method = "CD";
    this.api_data.channel = "zg_kiosk";
    this.api_data.dispose_date = "2024-05-23";
    this.api_data.item_list = item_list;
    this.api_data.upload_images = [];
    this.serGovId = guData.id;

    this.calcTotal();

  },
  methods: {
    async procPay() {

      // createPaymentApprove(paymentMethodId, paymentId, accId, accSec, data)
      try {
        this.pay_data.amount = this.total;
        this.pay_data.item_title = this.guData.name + ' 대형생활폐기물 결제';
        this.pay_data.buyer_name = this.userName;
        this.pay_data.buyer_tel = this.userTel;

        const payData = this.pay_data;
        console.log(JSON.stringify(payData));

        const paymentMethodId = this.guData.kiosk_payment_method_id;
        const accId = this.guData.payment_account_id;
        const accSec = this.guData.payment_secret_key;
        
        const response = await createPaymentRequest(paymentMethodId, accId, accSec, payData);

        if (response.payment_id) {
          this.api_data.payment_id = response.payment_id;
          console.log(response);
          this.procAppove();
        }

      } catch (error) {
        console.error('결제 정보를 가져오는 중 오류 발생:', error);
      }
    },
    async procAppove() {

      // createPaymentApprove(paymentMethodId, paymentId, accId, accSec, data)
      try {

        const data = this.approve_data;
        //console.log(JSON.stringify(data));

        const paymentMethodId = this.guData.kiosk_payment_method_id;
        const accId = this.guData.payment_account_id;
        const accSec = this.guData.payment_secret_key;
        const paymentId = this.api_data.payment_id;
        
        const response = await createPaymentApprove(paymentMethodId, paymentId, accId, accSec, data);

        console.log('출력');

        // if (response) {
        //   console.log(response);
        //   this.completeNext();
        // } else {
        //   this.completeNext();
        // }
        console.log(response);
        this.completeNext();

      } catch (error) {
        console.error('Approve 정보를 가져오는 중 오류 발생:', error);
      }
      },
    async completeNext() {
      console.log('원장 저장');
      try {
        const data = this.api_data;
        console.log(JSON.stringify(data));
        
        const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
        const serGovId = this.serGovId;
        const response = await createLargeWasteRequest(serGovId, data, kioskToken);

        if (response) {
          console.log('원장 정보 저장 결과');
          console.log(response);
          this.$router.push({ name: 'MainPage' });
        }

      } catch (error) {
        console.error('정보를 가져오는 중 오류 발생:', error);
      }




      //this.$router.push({ name: 'MainPage' });
    },
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calcTotal() {
      // console.log('출력');
      // console.log(this.orderProducts);
      let qty = 0;
      let total = 0;
      for (const item of this.orderProducts) {
        //qty = qty + item.qty;
        qty++;
        total = total + item.total;
      }
      this.qty = qty;
      this.total = total;
      // console.log(this.qty);
      // console.log(this.total);
    },
    editContents(page) {
      localStorage.setItem('editPage', page);
      this.$router.push({ name: page });
    },
  }
};
</script>

<style scoped>
.card {
  display: block;
  margin: 15px 20px;
  background-color: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
}
.card_content {
  display: block;
  text-align: left;
  height: 40px;
  color: #2C2C2C;
  font-size: 24px;
  font-weight: 600;
  margin: 0px 30px 15px;
}
.card_content2 {
  display: block;
  height: 40px;
  color: #2C2C2C;
  font-size: 24px;
  font-weight: 600;
  margin: 0px 30px 15px;
  overflow: hidden;
}
.card_content2 .left_content {
  float: left;
  height: 40px;
}
.card_content2 .right_content {
  float: right;
  text-align: right;
}
.card_content2 span {
  display: inline;
  font-size: 24px;
}
.card_content2 p {
  display: inline;
  margin-left: 20px;
  font-size: 24px;
}
.card_title {
  text-align: left;
  overflow: hidden;
  display: block;
  position: relative;
}
.card_title p {
  margin-left: 30px;
  display: inline-block;
  text-align: left;
  width: 140px;
  height: 40px;
  color: #767676;
  font-size: 24px;
  font-weight: 600;
}
.card_title span {
  display: inline-block;
  width: 200px;
  height: 40px;
  color: #2C2C2C;
  font-size: 24px;
  font-weight: 600;
}
.card_title img {
  position: absolute;
  right: 30px;
  top: 36px;
  width: 8px;
  padding: 0px;
  margin: 0px;
}
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
  line-height: 60px;
  float: left;
  width: 40%;
  padding-left: 10px;
}
.info_content {
  float: right;
  width: 40%;
  padding-right: 20px;
  line-height: 60px;
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
  height: 3000px;
  overflow:hidden;
  background-color: #F5F5F5;
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
  margin: 20px 0;
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
  font-size: 32px;
  font-weight: 400;
  margin: 0px 0 100px;
}
h3 {
  color: #2C2C2C;
  font-size: 40px;
  margin: 100px 0px 30px;
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
}
</style>
