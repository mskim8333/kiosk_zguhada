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
        <input :value="keyValue" maxlength="15" placeholder="주소를 입력해주세요.">
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
            <span class="keyInfo keyShift" v-else-if="key[shiftIndex] === 'Shift'">
              <img src="../assets/upper.png" />
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
        아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다.
      </div>
      <div class="info_box">
        <div class="info_row">
          · 도로명 + 건물명
          <span>예)서초대로</span>
        </div>
        <div class="info_row">
          · 동/읍/면/리 + 번지
          <span>예)성수동 999-999</span>
        </div>
        <div class="info_row">
          · 건물명/아파트명
          <span>예)성수한라시트마벨리</span>
        </div>
      </div>
      <div class="btn_wrap">
        <router-link class="btn" to="/addr2">임시 다음페이지 이동</router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import { searchAddress } from '../api'
import KeyData from './keyData'
const Hangul = require('hangul-js');
export default {
  name: 'AddrPage',
  props: {
    msg: String,
    valueArr: Array,
    theme: String
  },
  data() {
    return {
      address: '',
      KeyData,
      shiftIndex: 0,
      capsLock: 0,
      lang: 'kr',
      keyArr: [],
      keyValue: null
    };
  },
  methods: {
    async fetchSearchAddress () {
      console.log('실행')
      try {
        const kioskToken = '20bcde59e4221e514a49326b0d4e5b74';
        const query = this.keyValue;
        const result = await searchAddress(kioskToken, query);
        console.log('주소 검색 정보:', result);
        // 여기서 반환된 설정 정보를 사용할 수 있습니다.
      } catch (error) {
        console.error('주소 검색 중에 오류가 발생했습니다:', error);
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
    }
  }
};
</script>

<style scoped>
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
.addrpage {
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
</style>