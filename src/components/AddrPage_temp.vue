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
const Hangul = require('hangul-js');
export default {
  name: 'AddrPage',
  props: {
    msg: String
  },
  data() {
    return {
      addr: '',
      inputText: '', // 사용자가 입력한 텍스트
    };
  },
  computed: {
  },
  methods: {
    customKeyboard(zone, input, onClick, onESC, onEnter, form) {
      /*
          zone : 생성될 위치
          input : 입력할 변수
          onClick : 키보드가 눌렸을때 동작
          onESC : 뒤로 눌렸을때 동작
          form : 키보드의 모습
      */
      var nowlang = "koNormal";
      this.setClick = function(newclick) {
          onClick = newclick;
      }
      this.setEnter = function(Enterfun) {
          onEnter = Enterfun;
      }
      this.setZone = function(newZone) {
          zone = newZone;
      };
      var charlist = [];
      this.setInput = function(inputtag) {
          input = inputtag;
          var sub = Hangul.disassemble("" + input.value);
          charlist = sub;
      }

      function getText() {
          return Hangul.assemble(charlist);
      }
      if (form == null) {
          form = {
              koNormal: [
                  ['뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
                  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
                  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'enter'],
                  ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '한/영'],
                  ["space"]
              ],
              koShift: [
                  ['뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace'],
                  ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
                  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'enter'],
                  ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '한/영'],
                  ["space"]
              ],
              enNormal: [
                  ['뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
                  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
                  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '한/영'],
                  ["space"]
              ],
              enShift: [
                  ['뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace'],
                  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'enter'],
                  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '한/영'],
                  ["space"]
              ]
          }
      }
      var keydiv = {};
      for (let index = 0; index < Object.keys(form).length; index++) {
          keydiv[Object.keys(form)[index]] = document.createElement("div")
          keydiv[Object.keys(form)[index]].style.cssText = `
              position: absolute;
              width : 100%;
              height: 100%;
              align : center;
              visibility: hidden;
              font-size: 25px;
          `
          for (let i = 0; i < form[Object.keys(form)[index]].length; i++) {
              var keyline = document.createElement("table");
              keyline.style.cssText = `
                  width : 100%;
                  height: calc(100% / ` + form[Object.keys(form)[index]].length + `);
              `
              for (let j = 0; j < form[Object.keys(form)[index]][i].length; j++) {
                  var key = document.createElement("th")
                  key.style.cssText = `
                      padding-top : calc((100% / ` + form[Object.keys(form)[index]].length + `) / 5);
                  `
                  key.innerText = form[Object.keys(form)[index]][i][j];
                  key.addEventListener("click", keyfun)
                  keyline.appendChild(key);
              }
              keydiv[Object.keys(form)[index]].appendChild(keyline);
          }
          zone.appendChild(keydiv[Object.keys(form)[index]])
      }
      keydiv[nowlang].style.visibility = "visible";

      function keyfun() {
          if (this.innerText == '뒤로') {
              onESC();
              return
          } else if (this.innerText == 'enter') {
              onEnter(getText());
              return
          } else if (this.innerText == '한/영') {
              keydiv[nowlang].style.visibility = "hidden";
              if (nowlang == "koNormal") {
                  nowlang = "enNormal"
              } else if (nowlang == "enNormal") {
                  nowlang = "koNormal"
              } else if (nowlang == "koShift") {
                  nowlang = "enShift"
              } else if (nowlang == "enShift") {
                  nowlang = "koShift"
              }
              keydiv[nowlang].style.visibility = "visible";
              return
          } else if (this.innerText == 'shift') {
              keydiv[nowlang].style.visibility = "hidden";
              if (nowlang == "koNormal") {
                  nowlang = "koShift"
              } else if (nowlang == "enNormal") {
                  nowlang = "enShift"
              } else if (nowlang == "koShift") {
                  nowlang = "koNormal"
              } else if (nowlang == "enShift") {
                  nowlang = "enNormal"
              }
              keydiv[nowlang].style.visibility = "visible";
              return
          } else if (this.innerText == 'backspace') {
              charlist.splice(charlist.length - 1, 1);
          } else if (this.innerText == 'space') {
              charlist.push(" ");
          } else {
              charlist.push(this.innerText);
          }

          var text = Hangul.assemble(charlist)
          input.value = text;
          if (onClick != null) {
              onClick(getText());
          }
      }


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
</style>