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
        <input :value="addr1" maxlength="15" readonly>
      </div>
      <div class="mt20">
        <input :value="keyValue" maxlength="15" placeholder="상세 주소를 입력해주세요." readonly>
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
              <!--<img src="../assets/search.png" />-->완료
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

    <div class="bottom_content">
      <div class="icon_row">
        <span class="tip">Tip</span>
      </div>
      <div class="info_txt">
        주소를 잘못 입력하신 경우 수거가 진행되지 않습니다.<br />배출하시는 장소를 상세히 입력해주세요.
      </div>
      <div class="info_box">
        <div class="info_row">
          예) 00아파트 101동 입구 앞
        </div>
      </div>
      <div class="btn_wrap">
        <button class="btn" @click="confirmAction()">완료</button>
      </div>
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
  <div :class="{ 'opa_bg': true, 'opa_hide': isActive2 }"></div>
  <div :class="{ 'opa_alert': true, 'opa_hide': isActive2 }">
    <div class="opa_alert_top">
      <span class="opa_msg">상세 주소를<br />입력 하시겠습니까?</span>
    </div>
    <div class="opa_alert_bottom">
      <button class="btn_n" @click="toggleActive2">아니요</button>
      <button class="btn_y" @click="confirmClick">확인</button>
    </div>
  </div>
</template>

<script>
import KeyData from './keyData'
const Hangul = require('hangul-js');
export default {
  name: 'AddrPage',
  props: {
  },
  mounted() {
    localStorage.setItem('selData2', null); // 상세 주소 입력 정보 초기화
    const data = JSON.parse(localStorage.getItem('selData'));
    //console.log(data);
    if (data) {
      this.addr1 = data.road_address.address_name;
    }
  },
  data() {
    return {
      addr1: '',
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
      isActive2: true,
    };
  },
  methods: {
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
          this.confirmAction()
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
    },
    toggleActive2() {
      this.isActive2 = true;
    },
    confirmAction() {
      console.log(this.keyValue);

      if (this.keyValue === '' || this.keyValue === null) {
        console.log('얼럿 출력');
        this.msg1 = "상세 주소를 입력해주세요.";
        this.isActive = false;
      } else {
        this.isActive2 = false;
      }
    },
    confirmClick() {
      const editPage = localStorage.getItem('editPage');

      if (editPage == 'AddrPage') {
        localStorage.setItem('selData2', this.keyValue);
        localStorage.setItem('editPage', null);
        this.$router.push({ name: 'OrderPage' });
      } else {
        localStorage.setItem('selData2', this.keyValue);
        this.$router.push({ name: 'SelPage' });
      }
    },
  }
};
</script>

<style scoped>
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
.mt20 {
  margin-top: 20px;
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
.opa_msg {
  padding-top: 20%;
}
</style>
