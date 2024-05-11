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
        <input v-model="addr" maxlength="15" placeholder="주소를 입력해주세요.">
      </div>
    </div>
    <div class="keyboard">
      <div class="key_row">
        <button class="key_btn" v-for="key in keys" :key="key" @click="handleKeyClick(key)">{{ key }}</button>
        <button class="key_btn" v-for="num in 10" :key="num" @click="handleKeyClick(num.toString())">{{ num }}</button>
      </div>
      <div class="key_row">
        <button class="key_btn key_icon">
          <img src="../assets/upper.png" />
        </button>
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
          <img src="../assets/delete.png" />
        </button>
        <button class="key_btn">ㅋ</button>
        <button class="key_btn">ㅌ</button>
        <button class="key_btn">ㅊ</button>
        <button class="key_btn">ㅍ</button>
        <button class="key_btn">ㅠ</button>
        <button class="key_btn">ㅜ</button>
        <button class="key_btn">ㅡ</button>
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
      mCombo: ['ㅗㅏ', 'ㅗㅐ', 'ㅗㅣ', 'ㅜㅓ', 'ㅜㅔ', 'ㅜㅣ', 'ㅡㅣ']
    };
  },
  computed: {
    keys() {
      return ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ','ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ','ㅋ','ㅌ','ㅊ','ㅍ'];
    }
  },
  methods: {
    handleKeyClick(key) {
      let inputText = this.inputText;

      // 스페이스 및 백스페이스는 별도로 처리
      if (key === ' ') {
        inputText += ' ';
      } else if (key === 'Backspace') {
        this.inputText = inputText.slice(0, -1);
        return;
      } else {
        // 한글 자음 입력인 경우
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
                inputText = inputText.slice(0, -1) + this.jCombo[newJongsungIndex];
              }
            }
          }
        }
        // 숫자 입력인 경우
        else if (/^[0-9]$/.test(key)) {
          inputText += key;
        }
      }

      this.inputText = inputText;
    }
  }
};
</script>

<style scoped>
.addrpage {
  width: 100%;
  height: 1100px;
  overflow: hidden;
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
h3 {
  color: #2C2C2C;
  font-size: 24px;
  margin-bottom: 100px;
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
.keyboard {
  margin-top: 20px;
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
.key_icon {
  width: 88px;
}
.key_space {
  width: 740px;
  color: #F5F5F5;
}
.bottom_content {
  position: fixed;
  bottom: 20px;
  left: 0px;
  width: 100%;
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
.info_txt {
  color: #767676;
  font-size: 14px;
  text-align: left;
  margin: 10px 30px;
}
.info_box {
  background-color: #F5F5F5;
  margin: 0px 30px;
  padding: 30px 20px;
  border-radius: 5px;
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
.btn_wrap {
  text-align: center;
  margin-top: 20px;
}
.btn {
  display: inline-block;
  background-color: #2C2C2C;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 5px;
  text-decoration: none;
}
</style>