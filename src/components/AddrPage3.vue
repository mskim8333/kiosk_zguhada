<template>
  <div class="addrpage">
    <div class="top_row">
      <router-link to="/">
        <img class="top_btn" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <h5>대형생활폐기물 배출을 위해1111</h5>
    <h3>배출하실 주소를 입력해주세요.</h3>
    <div class="ip_row">
      <div>
        <input v-model="addr" maxlength="15" placeholder="주소를 입력해주세요.">
      </div>
      <div class="mt10">
        <input v-model="addr2" maxlength="15" placeholder="상세주소를 입력해주세요.">
      </div>
    </div>
    <div class="keyboard">
      <div class="key_row">
        <button class="key_btn">ㅂ</button>
        <button class="key_btn">ㅈ</button>
        <button class="key_btn">ㄷ</button>
        <button class="key_btn">ㄱ</button>
        <button class="key_btn">ㅅ</button>
        <button class="key_btn">ㅛ</button>
        <button class="key_btn">ㅕ</button>
        <button class="key_btn">ㅑ</button>
        <button class="key_btn">ㅐ</button>
        <button class="key_btn">ㅔ</button>
      </div>
      <div class="key_row">
        <button class="key_btn">ㅁ</button>
        <button class="key_btn">ㄴ</button>
        <button class="key_btn">ㅇ</button>
        <button class="key_btn">ㄹ</button>
        <button class="key_btn">ㅎ</button>
        <button class="key_btn">ㅗ</button>
        <button class="key_btn">ㅓ</button>
        <button class="key_btn">ㅏ</button>
        <button class="key_btn">ㅣ</button>
      </div>
      <div class="key_row">
        <button class="key_btn key_icon">
          <img src="../assets/upper.png" />
        </button>
        <button class="key_btn">ㅋ</button>
        <button class="key_btn">ㅌ</button>
        <button class="key_btn">ㅊ</button>
        <button class="key_btn">ㅍ</button>
        <button class="key_btn">ㅠ</button>
        <button class="key_btn">ㅜ</button>
        <button class="key_btn">ㅡ</button>
        <button class="key_btn key_icon">
          <img src="../assets/delete.png" />
        </button>
      </div>
      <div class="key_row">
        <button class="key_btn key_icon">123</button>
        <button class="key_btn key_space">스페이스</button>
        <button class="key_btn key_icon">
          <img src="../assets/search.png" />
        </button>
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
          <span>예) 00아파트 101동 입구 앞</span>
        </div>
      </div>
      <div class="btn_wrap">
        <router-link class="btn" to="/">완료</router-link>
      </div>
    </div>
  </div>
</template>

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
  width: 88px;
  height: 85px;
}
.key_btn img {
  height: 20px;
}
.key_icon {
  width: 88px;
}
.key_icon {
  width: 88px;
}
.key_space {
  width: 740px;
  color: #F5F5F5;
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
  font-size: 20px;
  font-weight: 400;
  margin: 100px 0 10px;
}
h3 {
  color: #2C2C2C;
  font-size: 24px;
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
  font-size: 20px;
  color: #767676;
  outline: none;
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
  font-size: 20px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border: 0px;
}
.mt10 {
  margin-top: 10px;
}
</style>

<script>
export default {
  name: 'AddrPage',
  props: {
    msg: String
  },
  data() {
    return {
      addr: '서울시 성동구 성수일로 12길 4',
      addr2: '',
      inputText: '', // 사용자가 입력한 텍스트
      chosungIndex: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
      jongsungIndex: ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
      jComboIndex: ["ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅄ"],
      jCombo: ["ㄱㅅ", "ㄴㅈ", "ㄴㅎ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅂㅅ"],
      mComboIndex: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'],
      mCombo: ['ㅗㅏ', 'ㅗㅐ', 'ㅗㅣ', 'ㅜㅓ', 'ㅜㅔ', 'ㅜㅣ', 'ㅡㅣ']
    };
  },
  computed: {
    keys() {
      return ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
    }
  },
  methods: {
    handleKeyDown(event) {
      const key = event.key;
      let inputText = this.inputText;

      // 스페이스 및 백스페이스는 별도로 처리
      if (key === ' ') {
        inputText += ' ';
        this.inputText = inputText;
        event.preventDefault();
        return;
      } else if (key === 'Backspace') {
        this.inputText = inputText.slice(0, -1);
        event.preventDefault();
        return;
      }

      // 다른 키는 별도의 로직으로 처리
      let hangeul = '';

      // 한글 자소 분해 로직
      // Unicode 기준 초성, 중성, 종성을 분리
      if (/^[ㄱ-ㅎ가-힣]$/.test(key)) {
        const charCode = key.charCodeAt(0) - 44032;
        const jongIndex = charCode % 28;
        const choIndex = parseInt((charCode - jongIndex) / 28 / 21);

        const chosung = this.chosungIndex[choIndex];

        // 이전 글자와 조합된 자음 또는 모음일 경우 처리
        // ex) ㄱ + ㅏ = 가, ㄱ + ㄱ = ㄲ
        // (이 부분의 로직은 한글 조합 규칙에 따라 작성되어야 합니다.)
        // 이 부분의 로직을 통해 입력된 한글을 올바르게 조합하여 hangeul에 저장
        if (inputText !== '') {
          const lastChar = inputText.charAt(inputText.length - 1);
          const lastCharCode = lastChar.charCodeAt(0) - 44032;
          const lastJongIndex = lastCharCode % 28;
          //const lastChoIndex = parseInt((lastCharCode - lastJongIndex) / 28 / 21);
          //const lastChosung = this.chosungIndex[lastChoIndex];

          // 이전 글자의 종성이 있고, 현재 글자가 초성일 경우
          if (lastJongIndex !== 0 && choIndex !== 0) {
            // 이전 글자의 종성과 현재 글자의 초성으로 새로운 종성을 구함
            const newJongsungIndex = this.jComboIndex.indexOf(this.jongsungIndex[lastJongIndex] + chosung);
            // 새로운 종성이 존재한다면
            if (newJongsungIndex !== -1) {
              // 종성을 변경
              hangeul = this.jCombo[newJongsungIndex];
            }
          }
        }

        // 최종 hangeul을 inputText에 추가
        this.inputText = inputText + hangeul;
      } else {
        // 특수문자 또는 알파벳 등의 경우 처리할 로직 추가
        // 여기에 추가적인 로직을 작성하세요
      }
    }
  }
};
</script>


