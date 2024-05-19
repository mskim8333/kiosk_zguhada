<template>
  <div class="addrpage">
    <div class="top_row">
      <router-link to="/sel">
        <img class="top_btn" alt="logo" src="../assets/back.png">
      </router-link>
      <router-link to="/">
        <img class="top_btn2" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <h5>대형생활폐기물 배출을 위해</h5>
    <h3>신청인의 이름을 입력해주세요.</h3>
    <div class="ip_row">
      <div>
        <input :value="keyValue" maxlength="15" placeholder="이름을 입력해주세요." readonly>
      </div>
    </div>
    <div class="keyboard">
      <div v-for="(keyLine, index) in KeyData[lang]" :key="index">
        <ul>
          <li
            v-for="(key, index) in keyLine"
            :key="index"
            class="key"
            v-bind:class="classObject(key[shiftIndex])"
            @click="() => keyEvent(key[shiftIndex])"
          >
            <span class="keyInfo keySpace" v-if="key[shiftIndex] === 'space'">{{ key[shiftIndex] }}</span>
            <span class="keyInfo keySearch" v-else-if="key[shiftIndex] === 'search'">
              <!--<img src="../assets/search.png" />-->검색
            </span>
            <span class="keyInfo keyShift" v-else-if="key[shiftIndex] === 'Shift' && shiftIndex === 0">
              <img src="../assets/upper.png" />
            </span>
            <span class="keyInfo keyShift2" v-else-if="key[shiftIndex] === 'Shift' && shiftIndex === 1">
              <img src="../assets/upper2.png" />
            </span>
            <span class="keyInfo keyBackspace" v-else-if="key[shiftIndex] === 'BackSpace'">
              <img src="../assets/delete.png" />
            </span>
            <span class="keyInfo keyLang" v-else-if="key[shiftIndex] === '한/영'">{{ key[shiftIndex] }}</span>
            <span class="keyInfo" v-else>{{ key[shiftIndex] }}</span>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
  <div class="bottom_content">
    <div class="btn_wrap">
      <button class="btn" @click="handleNextClick()">입력완료</button>
    </div>
  </div>
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive }">
    <div class="opa_alert_top">
      <img src="../assets/alert.png" />
      <span>{{ msg1 }}</span>
    </div>
    <div class="opa_alert_bottom">
      <button @click="toggleActive">확인</button>
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
import { searchAddress } from '../api'
import { getKioskProducts2 } from '../api/index';
import KeyData from './keyData'
const Hangul = require('hangul-js');
export default {
  name: 'AddrPage',
  props: {
    msg: String,
    valueArr: Array,
    theme: String,
  },
  mounted() {
    localStorage.setItem('addrData', null); // 주소 검색 결과 초기화
    localStorage.setItem('addrInput', null); // 입력 주소 초기화
    localStorage.setItem('guData', null); // 지자체 정보 초기화
    localStorage.setItem('selData', null); // 주소 선택 정보 초기화
    localStorage.setItem('selData2', null); // 상세 주소 입력 정보 초기화
  },
  data() {
    return {
      address: '',
      KeyData,
      shiftIndex: 0,
      capsLock: 0,
      lang: 'kr',
      keyArr: [],
      keyValue: null,
      items: [],
      msg1: '',
      isActive: true,
    };
  },
  methods: {
    handleNextClick() {
      this.$router.push({ name: 'UserPage2' });
    },
    async fetchSearchAddress () {
      console.log('실행')
      try {
        if (this.keyValue) {
          const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
          const query = this.keyValue;
          const result = await searchAddress(kioskToken, query);

          const filteredData = (result.documents).filter(item => item.address.main_address_no && item.road_address.main_building_no);
          console.log(filteredData);

          localStorage.setItem('addrData', JSON.stringify(filteredData));
          localStorage.setItem('addrInput', query);

          this.$router.push({ name: 'AddrPage2' });
        } else {
          this.msg1 = '주소를 입력해주세요.';
          this.isActive = false;
        }
      } catch (error) {
        console.error('주소 검색 중에 오류가 발생했습니다:', error);
        this.msg1 = '주소 검색 중에 오류가 발생했습니다.';
          this.isActive = false;
      }
    },
    classObject (key) {
      switch (key) {
        case 'BackSpace':
          return { delete: true }
        case 'Tab':
          return { tab: true }
        case 'CapsLock':
          return { caps: true }
        case 'Enter':
          return { enter: true }
        case 'Shift':
          if (this.shiftIndex === 1) {
            return { shift: true, active: true }
          } return { shift: true, active: false }
        case '한/영':
          if (this.lang === 'en') {
            return { lang: true, active: true }
          } return { lang: true, active: false }
        case 'space':
          return { space: true }
        default:
          return { none: false }
      }
    },
    async keyEvent (key) {
      switch (key) {
        case 'search':
          this.fetchSearchAddress()
          break;
        case 'Shift':
        case 'CapsLock':
          if (this.shiftIndex === 1) {
            this.shiftIndex = 0
          } else {
            this.shiftIndex = 1
          }
          break
        case '한/영':
          if (this.lang === 'kr') {
            this.lang = 'en'
          } else {
            this.lang = 'kr'
          }
          break
        case 'BackSpace':
          this.delete()
          break
        case 'space':
          await this.keyArr.push(' ')
          this.keyValue = await Hangul.assemble(this.keyArr)
          await this.$emit('getKeyValue', this.keyValue)
          break;
        default:
          await this.keyArr.push(key)
          this.keyValue = await Hangul.assemble(this.keyArr)
          await this.$emit('getKeyValue', this.keyValue)
          break
      }
    },
    async delete () {
      await this.keyArr.pop()
      this.keyValue = await Hangul.assemble(this.keyArr)
      await this.$emit('getKeyValue', this.keyValue)
    },
    toggleActive() {
      this.isActive = true;
    }
  }
};
</script>

<style scoped>
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
ul {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: inline-block;
}
.keyInfo {
  display: block;
  background-color: #F5F5F5;
  color: #767676;
  font-size: 32px;
  font-weight: 400;
  border-radius: 10px;
  width: 90px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 4px;
}
.keyInfo:active {
  background-color: #1E64FF;
  color: #FFFFFF;
}
.keySpace {
  width: 700px;
  color: #F5F5F5;
}
.keyLang {
  width: 120px;
}
.keySearch {
  width: 140px;
}
.keySearch img {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.keyBackspace img {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.keyShift img {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.keyShift2 {
  background-color: #1E64FF;
}
.keyShift2 img {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
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
  height: 30%;
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
.opa_hide {
  display: none;
}
.bottom_content {
  position: fixed;
  bottom: 20px;
  left: 0px;
  width: 100%;
}
.info_row {
  text-align: left;
  font-size: 24px;
  line-height: 40px;
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
  font-size: 22px;
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
  font-size: 24px;
  color: #2960E8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
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
</style>
