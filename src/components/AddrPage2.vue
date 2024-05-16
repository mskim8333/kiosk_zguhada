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
        <input v-model="addr" maxlength="15" placeholder="주소를 입력해주세요." readonly>
      </div>
    </div>
    <div class="addr_wrap">
      
      <div class="addr_box" 
        v-for="(item, index) in itemArr" 
        :key="index" 
        @click="handleAddressClick(index)" 
        :class="{ 'selected': selectedIndex === index }"
        >
        <div class="addr_row" v-if="item.road_address">
          <span>도로명</span>
          <p>{{ item.road_address.address_name }}</p>
        </div>
        <div class="addr_row" v-if="item.address_name">
          <span>지 번</span>
          <p>{{ item.address_name }}</p>
        </div>
      </div>

      <div class="addr_none" v-if="itemArr.length < 1">
        <img src="../assets/list_g.png">
        <span>검색결과가 없습니다.</span>
        <p>검색어를 다시 확인해주세요.</p>
      </div>
      
    </div>
    <div class="bottom_content">
      <div class="btn_wrap" v-if="itemArr.length < 1">
        <router-link to="/addr" class="btn">이전</router-link>
      </div>
      <div class="btn_wrap" v-else>
        <button class="btn" @click="handleNextClick()">다음</button>
      </div>
    </div>
  </div>
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive }">
    <div class="opa_alert_top">
      <img src="../assets/alert.png" />
      <span v-html="msg1"></span>
    </div>
    <div class="opa_alert_bottom">
      <button @click="toggleActive">확인</button>
    </div>
  </div>
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive2 }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive2 }">
    <div class="opa_alert_top">
      <span class="opa_msg">선택하신 주소가<br />"{{ selAddr }}"가 맞으신가요?</span>
    </div>
    <div class="opa_alert_bottom">
      <button class="btn_n" @click="toggleActive2">아니요</button>
      <button class="btn_y" @click="confirmClick">확인</button>
    </div>
  </div>
</template>

<script>
import { getServiceGovernmentInfo } from '../api'

export default {
  name: 'AddrPage',
  props: {},
  mounted() {
    localStorage.setItem('guData', null); // 지자체 정보 초기화
    localStorage.setItem('selData', null); // 주소 선택 정보 초기화
    localStorage.setItem('selData2', null); // 상세 주소 입력 정보 초기화
    const data = localStorage.getItem('addrData');
    console.log(data);
    if (data) {
      this.itemArr = JSON.parse(data);
    }
    const data2 = localStorage.getItem('addrInput');
    console.log(data2);
    if (data2) {
      this.addr = data2;
    }
  },
  data() {
    return {
      itemArr: [],
      addr: '',
      selectedIndex: -1,
      msg1: '',
      isActive: true,
      isActive2: true,
      selAddr: '',
    };
  },
  computed: {
  },
  methods: {
    async fetchSearchGucode () {
      console.log('실행')
      try {
        if (this.selectedIndex !== -1) {
          const query = (this.itemArr[this.selectedIndex].address.b_code).substring(0,5);
          let query2 = this.itemArr[this.selectedIndex].road_address.building_name;
          if (query2 === '') {
            query2 = this.itemArr[this.selectedIndex].road_address.address_name;
          }
          this.selAddr = query2;
          console.log(query);
          const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
          const result = await getServiceGovernmentInfo(query, kioskToken);
          console.log(result);
          localStorage.setItem('guData', JSON.stringify(result));
          this.isActive2 = false;
        } else {
          this.msg1 = '주소를 선택해주세요.';
          this.isActive = false;
          localStorage.setItem('guData', null);
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.msg1 = '선택하신 지역은<br />서비스 이용 가능 지역이 아닙니다.';
          this.isActive = false;
          localStorage.setItem('guData', null);
        } else {
          this.msg1 = '지자체 정보 조회중에 오류가 발생했습니다.';
          this.isActive = false;
          localStorage.setItem('guData', null);
        }
      }
    },
    handleAddressClick(index) {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
      } else {
        this.selectedIndex = -1;
      }
    },
    handleNextClick() {
      console.log('next click');
      this.fetchSearchGucode();
    },
    toggleActive() {
      this.isActive = true;
    },
    toggleActive2() {
      this.isActive2 = true;
    },
    confirmClick() {
      localStorage.setItem('selData', JSON.stringify(this.itemArr[this.selectedIndex]));
      this.$router.push({ name: 'AddrPage3' });
    },
  }
};
</script>



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
.addr_box.selected {
  border: 1px solid #1E64FF;
  background-color: #EAF2FF;
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
.addrpage {
  width: 100%;
  height: 1100px;
  overflow:hidden;
  background-color: #FFFFFF;
}
.top_row {
  overflow: hidden;
}
.top_btn {
  float: left;
  width: 20px;
  margin: 20px 20px;
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
.top_row {
  overflow: hidden;
}
.top_btn {
  float: left;
  width: 20px;
  margin: 20px 20px;
}
h5 {
  color: #767676;
  font-size: 32px;
  font-weight: 400;
  margin: 100px 0 10px;
}
h3 {
  color: #2C2C2C;
  font-size: 40px;
  margin: 0px 0px 100px;
}
.ip_row {
  margin: 0 40px 20px;
  overflow: hidden;
}
.ip_row div {
  float: left;
  width: 100%;
  border-bottom: 2px solid #E4E4E4;
}
.ip_row div input {
  width: 100%;
  padding: 10px;
  border: 0px;
  font-size: 30px;
  color: #767676;
  outline: none;
}
.ip_row div input::placeholder{
  color: #B4B4B4;
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
  font-size: 24px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  border: 0px;
}
.addr_none {
  text-align: center;
  margin: 0px;
}
.addr_none img {
  display: inline-block;
  margin: 200px 0 40px;
}
.addr_none span {
  display: block;
  text-align: center;
  color: #767676;
  font-size: 30px;
  font-weight: 600;
}
.addr_none p {
  display: block;
  text-align: center;
  color: #999999;
  font-size: 24px;
  font-weight: 400;
}
.opa_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: #000000;
  opacity: 0.5;
}
.opa_alert {
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 36%;
  left: 15%;
  top: 32%;
  background-color: #FFFFFF;
  border-radius: 4%;
}
.opa_alert_top {
  width: 100%;
  height: 80%;
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
}
.opa_alert_bottom {
  width: 100%;
  height: 20%;
}
.opa_alert_bottom button {
  width: 100%;
  height: 100%;
  background-color: #1E64FF;
  border: 0px;
  color: #FFFFFF;
  font-size: 40px;
  font-weight: 600;
}
.opa_alert_bottom button.btn_y {
  margin: 0px;
  padding: 0px;
  display: inline-block;
  width: 50%;
}
.opa_alert_bottom button.btn_n {
  margin: 0px;
  padding: 0px;
  display: inline-block;
  width: 50%;
  background-color: #EDEDED;
  color: #2C2C2C;
}
.opa_hide {
  display: none;
}
.opa_msg {
  padding-top: 20%;
}
</style>
