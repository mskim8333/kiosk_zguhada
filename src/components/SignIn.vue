<template>
  <div class="signin">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <div class="ip_row">
      <span>토큰</span>
      <div>
        <input v-model="keyValue1" maxlength="15" @click="() => focusProc(1)" :class="{ 'selected': kFocus === 1 }" readonly placeholder="토큰값을 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>아이디</span>
      <div>
        <input v-model="keyValue2" maxlength="15" @click="() => focusProc(2)" :class="{ 'selected': kFocus === 2 }" readonly placeholder="아이디를 입력해주세요.">
      </div>
    </div>
    <div class="ip_row">
      <span>비밀번호</span>
      <div>
        <input type="password" maxlength="15" @click="() => focusProc(3)" :class="{ 'selected': kFocus === 3 }" readonly v-model="keyValue3" placeholder="비밀번호를 입력해주세요.">
      </div>
    </div>
    <div class="btn_wrap">
      <button class="btn" @click="val_ck()">로그인</button>
    </div>
    <div class="info" v-if="kFocus === -1">
      <div class="bline">기기 고장 및 AS/사용법 문의</div>
      <div class="rline">지구하다 고객센터 1234-1234</div>
    </div>
    <div class="keyboard" v-if="kFocus !== -1">
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
            <span class="keyInfo keySearch keyHidden" v-else-if="key[shiftIndex] === 'search'">
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
</template>

<script>
import { adminLogin } from '../api'
import KeyData from './keyData'
const Hangul = require('hangul-js');
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
      KeyData,
      shiftIndex: 0,
      capsLock: 0,
      lang: 'en',
      keyArr: [],
      keyValue: null,
      keyArr1: ['2','0','b','c','d','e','5','9','e','4','2','2','1','e','5','1','4','a','4','9','3','2','6','b','0','d','4','e','5','b','7','4'],
      keyValue1: '20bcde59e4221e514a49326b0d4e5b74',
      keyArr2: ['k','i','o','s','k','_','u','s','e','r','_','1'],
      keyValue2: 'kiosk_user_1',
      keyArr3: ['c','h','u','n','i','l','t','e','s','t','1','2','3','4'],
      keyValue3: 'chuniltest1234',
      items: [],
      msg1: '',
      isActive: true,
      kFocus: -1,
    }
  },
  methods: {
    async fetchSignin () {
      console.log('실행')
      try {
        if (this.keyValue1 && this.keyValue2 && this.keyValue3) {
          //const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
          const query = this.keyValue1;
          const query2 = this.keyValue2;
          const query3 = this.keyValue3;
          const result = await adminLogin(query2, query3, query);

          console.log(result);

          localStorage.setItem('admintoken', result);
          this.$router.push({ name: 'MainPage' });
        }
      } catch (error) {
        console.error('로그인 중에 오류가 발생했습니다:', error);
        this.msg1 = '로그인 중에 오류가 발생했습니다.';
          this.isActive = false;
      }
    },
    focusProc(val) {
      this.kFocus = val;
    },
    val_ck() {
      if (!this.keyValue1) {
        this.msg1 = '토큰을 입력해주세요!';
        this.isActive = false;
        //alert("토큰을 입력해주세요!");
        return false;
      }
      if (!this.keyValue2) {
        this.msg1 = '아이디를 입력해주세요!';
        this.isActive = false;
        //alert("아이디를 입력해주세요!");
        return false;
      }
      if (!this.keyValue3) {
        this.msg1 = '비밀번호를 입력해주세요!';
        this.isActive = false;
        //alert("비밀번호를 입력해주세요!");
        return false;
      }
      this.fetchSignin();
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
          if (this.kFocus === 1) {
            await this.keyArr1.push(' ')
            this.keyValue1 = await Hangul.assemble(this.keyArr1)
            await this.$emit('getKeyValue', this.keyValue1)
          } else if (this.kFocus === 2) {
            await this.keyArr2.push(' ')
            this.keyValue2 = await Hangul.assemble(this.keyArr2)
            await this.$emit('getKeyValue', this.keyValue2)
          } else if (this.kFocus === 3) {
            await this.keyArr3.push(' ')
            this.keyValue3 = await Hangul.assemble(this.keyArr3)
            await this.$emit('getKeyValue', this.keyValue3)
          }
          break;
        default:
          if (this.kFocus === 1) {
            await this.keyArr1.push(key)
            this.keyValue1 = await Hangul.assemble(this.keyArr1)
            await this.$emit('getKeyValue', this.keyValue1)
          } else if (this.kFocus === 2) {
            await this.keyArr2.push(key)
            this.keyValue2 = await Hangul.assemble(this.keyArr2)
            await this.$emit('getKeyValue', this.keyValue2)
          } else if (this.kFocus === 3) {
            await this.keyArr3.push(key)
            this.keyValue3 = await Hangul.assemble(this.keyArr3)
            await this.$emit('getKeyValue', this.keyValue3)
          }
          break
      }
    },
    async delete () {
      if (this.kFocus === 1) {
        await this.keyArr1.pop()
        this.keyValue1 = await Hangul.assemble(this.keyArr1)
        await this.$emit('getKeyValue', this.keyValue1)
      } else if (this.kFocus === 2) {
        await this.keyArr2.pop()
        this.keyValue2 = await Hangul.assemble(this.keyArr2)
        await this.$emit('getKeyValue', this.keyValue2)
      } else if (this.kFocus === 3) {
        await this.keyArr3.pop()
        this.keyValue3 = await Hangul.assemble(this.keyArr3)
        await this.$emit('getKeyValue', this.keyValue3)
      }
    },
    toggleActive() {
      this.isActive = true;
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
.ip_row div input.selected {
  background-color: #F5F5F5;
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
  margin: 0 3px;
}
a {
  color: #42b983;
}
.keyInfo {
  display: block;
  background-color: #F5F5F5;
  color: #767676;
  font-size: 32px;
  font-weight: 400;
  border-radius: 10px;
  width: 85px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  margin: 3px;
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
.keyHidden {
  display: none;
  margin: 0px;
  padding: 0px;
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
</style>
