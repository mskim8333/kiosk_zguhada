<template>
  <div class="addrpage">
    <!-- 상단 로고 및 버튼 -->
    <div class="top_row">
      <router-link to="/">
        <img class="top_btn" alt="logo" src="../assets/home.png">
      </router-link>
    </div>
    <!-- 타이틀 및 입력창 -->
    <h5>대형생활폐기물 배출을 위해</h5>
    <h3>배출하실 주소를 입력해주세요.</h3>
    <div class="ip_row">
      <div>
        <input v-model="addr" maxlength="15" placeholder="주소를 입력해주세요.">
      </div>
    </div>
    <!-- 한글 자판 -->
    <div class="keyboard">
      <div class="key_row">
        <button v-for="key in keys" class="key_btn">{{ key }}</button>
      </div>
      <div class="key_row">
        <button v-for="key in mCombo" class="key_btn">{{ key }}</button>
      </div>
      <div class="key_row">
        <button v-for="key in jCombo" class="key_btn">{{ key }}</button>
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

    <!-- 하단 내용 -->
    <div class="bottom_content">
      <div class="icon_row">
        <span class="tip">Tip</span>
      </div>
      <div class="info_txt">
        아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다.
      </div>
      <div class="info_box">
        <div class="info_row" v-for="(info, index) in addressInfos" :key="index">
          <span>{{ info.label }}</span>
          <span>{{ info.example }}</span>
        </div>
      </div>
      <div class="btn_wrap">
        <router-link class="btn" to="/addr2">임시 다음페이지 이동</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddrPage',
  props: {
    msg: String
  },
  data() {
    return {
      addr: '',
      inputText: '',
      chosungIndex: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
      jongsungIndex: ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
      jComboIndex: ["ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅄ"],
      jCombo: ["ㄱㅅ", "ㄴㅈ", "ㄴㅎ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅂㅅ"],
      mComboIndex: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'],
      mCombo: ['ㅗㅏ', 'ㅗㅐ', 'ㅗㅣ', 'ㅜㅓ', 'ㅜㅔ', 'ㅜㅣ', 'ㅡㅣ'],
      keys: ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],
      addressInfos: [
        { label: '도로명 + 건물명', example: '예)서초대로' },
        { label: '동/읍/면/리 + 번지', example: '예)성수동 999-999' },
        { label: '건물명/아파트명', example: '예)성수한라시트마벨리' }
      ]
    };
  },
  methods: {
    handleKeyDown(event) {
      const key = event.key;
      let inputText = this.inputText;

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

      let hangeul = '';

      if (/^[ㄱ-ㅎ가-힣]$/.test(key)) {
        const charCode = key.charCodeAt(0) - 44032;
        const jongIndex = charCode % 28;
        const choIndex = parseInt((charCode - jongIndex) / 28 / 21);
        const chosung = this.chosungIndex[choIndex];

        if (inputText !== '') {
          const lastChar = inputText.charAt(inputText.length - 1);
          const lastCharCode = lastChar.charCodeAt(0) - 44032;
          const lastJongIndex = lastCharCode % 28;

          if (lastJongIndex !== 0 && choIndex !== 0) {
            const newJongsungIndex = this.jComboIndex.indexOf(this.jongsungIndex[lastJongIndex] + chosung);

            if (newJongsungIndex !== -1) {
              hangeul = this.jCombo[newJongsungIndex];
            }
          }
        }

        this.inputText = inputText + hangeul;
      }
    }
  }
};
</script>

<style scoped>
.addrpage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #FFFFFF;
}

.top_row, .bottom_content {
  margin: 0 30px;
}

.top_btn {
  float: left;
  width: 20px;
  margin: 20px 20px;
}

h5, .info_txt {
  color: #2C2C2C;
  font-size: 24px;
  font-weight: 700;
}

h3 {
  color: #2C2C2C;
  font-size: 24px;
}

.ip_row {
  margin-bottom: 20px;
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

.key_row {
  overflow: hidden;
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

.key_space {
  width: 740px;
  color: #F5F5F5;
}

.icon_row {
  display: block;
  margin: 0 0 10px;
}

.tip {
  display: inline-block;
  background-color: #EAF2FF;
  padding: 3px 8px;
  color: #2960E8;
  border-radius: 6px;
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
  padding: 30px 20px;
  border-radius: 5px;
}

.btn_wrap {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #2960E8;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #1F4AC6;
}

.bottom_content {
  position: fixed;
  bottom: 20px;
  left: 0px;
  width: 100%;
}
</style>
