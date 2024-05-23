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
    <h3>배출하실 날짜를 선택해주세요.</h3>
    
    <div class="cate_row">
      <span class="cate_left" @click="prevCk">
        <img class="arrow" src="../assets/circle_left.png">
      </span>
      <div class="cate_content">
        {{ currentYear }}년 {{ currentMonth+1 }}월
      </div>
      <span class="cate_right" @click="nextCk">
        <img class="arrow" src="../assets/circle_right.png">
      </span>
    </div>

    <div class="cld">
      <div class="cld_title">
        <span>일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
      </div>
      <div class="cld_row"
        v-for="(item, index) in week" 
        :key="index"
      >
        <span
          v-for="(item2, index2) in item" 
          :key="index2"          
        >
          <p
            v-if="this.currentYear > this.year || (this.currentYear >= this.year && this.currentMonth > this.month) || (this.currentYear >= this.year && this.currentMonth == this.month && item2 >= this.date)"
            @click="selProc(item2)"
            :class="{active: this.currentYear == this.selYear && this.currentMonth == this.selMonth && this.selDate == item2}"
          >
            {{ item2 }}
          </p>
          <p
            class="inactive"
            v-else
          >
            {{ item2 }}
          </p>
        </span>
      </div>
    </div>
  </div>

  <div class="bottom_content">

    <div class="info_box">
      <div class="info_row">
        · 수거 완료까지는 배출일로부터 평균 2영업일이 소요되며, 상황에 따라 지연될 수 있어요.
      </div>
      <div class="info_row">
        · 공동주택(아파트)의 경우는 지정된 수거요일에만 수거하고 있어요.
      </div>
    </div>
    
    <div class="btn_wrap">
      <button class="btn" @click="handleNextClick()">선택완료</button>
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
export default {
  name: 'DatePage',
  props: {
    msg: String,
    valueArr: Array,
    theme: String,
  },
  mounted() {
  },
  data() {
    return {
      address: '',
      shiftIndex: 0,
      capsLock: 0,
      lang: 'kr',
      keyArr: [],
      keyValue: null,
      items: [],
      msg1: '',
      isActive: true,
      year: null,
      month: null,
      date: null,
      week: [],
      today: null,
      currentMonth: null,
      currentYear: null,
      seltMonth: null,
      selYear: null,
      selDate: null,
    };
  },
  created() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.date = this.today.getDate();
    this.currentMonth = this.month;
    this.currentYear = this.year;
    this.selMonth = this.month;
    this.selYear = this.year;
    this.selDate = this.date;
    this.getDates(); // 달력의 전체 날짜를 출력하는 함수

    this.selValue();
  },
  methods: {
    prevCk() {
      if (this.currentMonth == 0) {
        this.currentYear = this.currentYear - 1;
        this.currentMonth = 11;
      } else {
        this.currentMonth = this.currentMonth - 1;
      }
      this.getDates();
    },
    nextCk() {
      if (this.currentMonth == 11) {
        this.currentYear = this.currentYear + 1;
        this.currentMonth = 0;
      } else {
        this.currentMonth = this.currentMonth + 1;
      }
      this.getDates();
    },
    selProc(date) {
      this.selYear = this.currentYear;
      this.selMonth = this.currentMonth;
      this.selDate = date;
      this.getDates();
      this.selValue();  
    },
    selValue() {
      let month = this.selMonth;
      let date = this.selDate;
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      if (date < 10) {
        date = '0' + date;
      }
      this.keyValue = this.selYear + '-' + month + '-' + date;
    },
    getFirstAndLastDate(month, year) {
      const lastMonthLastDate = new Date(year, month, 0).getDate();
      const lastMonthLastDay = new Date(year, month, 0).getDay();
      const thisMonthLastDate = new Date(year, month+1, 0).getDate();
      const nextMonthFirstDay = new Date(year,month+1).getDay();
      return [this.lastMonthLastDate=lastMonthLastDate, this.lastMonthLastDay=lastMonthLastDay, 
      this.thisMonthLastDate=thisMonthLastDate, this.nextMonthFirstDay=nextMonthFirstDay];
    },
    getDates() {
      const [lastMonthLastDate, lastMonthLastDay, thisMonthLastDate, nextMonthFirstDay] = this.getFirstAndLastDate(this.currentMonth, this.currentYear);
      console.log(lastMonthLastDate, lastMonthLastDay, thisMonthLastDate, nextMonthFirstDay);

      this.week = [];

      const wk = Math.floor((thisMonthLastDate + lastMonthLastDay + 1) / 7) + 1; // 주차 카운트
      console.log('주차 : ' + wk);
      let start = 1;
      let end = thisMonthLastDate;
      console.log(start);
      console.log(end);
      for (let i=0; i<wk; i++) {

        let wk_arr = [];
        if (i == 0) {
          for (let k=0; k<=lastMonthLastDay; k++) {
            wk_arr.push(null);
          }
          for (let j=lastMonthLastDay+1; j<7; j++) {
            wk_arr.push(start);
            start++;
          }
        } else {
          for (let j=0; j<7; j++) {
            if (start <= end) {
              wk_arr.push(start);
              start++;
            } else {
              wk_arr.push(null);
            }
          }
        }

        this.week.push(wk_arr);
      }

      console.log(this.week);
    },
    handleNextClick() {
      console.log(this.keyValue);
      
      if (this.keyValue) {
        const editPage = localStorage.getItem('editPage');
        if (editPage == 'DatePage') {
          localStorage.setItem('editPage', null);
          localStorage.setItem('userDate', this.keyValue);
          this.$router.push({ name: 'OrderPage' });
        } else {
          localStorage.setItem('userDate', this.keyValue);
          this.$router.push({ name: 'UserPage' });
        }
      } else {
        this.msg1 = '배출하실 날짜를 선택해주세요.';
        this.isActive = false;
      }
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
.cate_row {
  position: relative;
  min-height: 40px;
}
.cate_content {
  text-align: center;
  line-height: 40px;
  display:block;
  margin: 10px 80px;
  color: #2C2C2C;
  font-weight: 600;
  font-size: 36px;
  overflow: hidden;
}
.cate_content2 {
  height: 30px;
  text-align: center;
  display:block;
  margin: 10px 80px;
}
.cate_content2 img {
  width: 10px;
  margin: 4px;
}
.cate_content button {
  border: 1px solid #E4E4E4;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #FFFFFF;
  color: #2C2C2C;
  font-weight: 600;
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
  left: 95px;
  top: 5px;
}
.cate_right {
  position: absolute;
  right: 95px;
  top: 5px;
}
.cate_left img {
  width: 30px;
}
.cate_right img {
  width: 30px;
}
.cld { 
  margin: 40px;
  padding: 0px;
 }
 .cld_title {
  font-size: 30px;
  color: #767676;
  margin: 80px 0px 40px 0px;
 }
 .cld_title span {
  display: inline-block;
  width: calc(100% / 7);
 }
 .cld_row {
  font-size: 30px;
  color: #2C2C2C;
 }
 .cld_row span {
  line-height: 140px;
  display: inline-block;
  width: calc(100% / 7);
 }
 .cld_row span p {
  margin: 0px;
  padding: 0px;
 }
 .cld_row span p.active {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 30px;
  background-color: #1E64FF;
  color: #FFFFFF;
  font-weight: 600;
 }
 .cld_row span p.inactive {
  color: #999999;
 }

</style>
