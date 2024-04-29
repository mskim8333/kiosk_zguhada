<template>
  <div class="temppage">
    <img class="logo" alt="logo" src="../assets/temp.png">
    <h5>지구하다는 점검 중</h5>
    <div class="msg">
      <span>더욱 안정적인 서비스를 제공하기 위해</span>
      <span>시스템 점검을 진행하고 잇습니다.</span>
      <span>점검이 완료된 후 다시 접속해주세요</span>
    </div>
    <div class="bottom_msg">
      <span>· 점검 대상 : 지구하다 전체 키오스크</span>
      <span>· 점검 사유 : 시스템 최적화</span>
      <span>· 점검 시간 : 매일 4시 ~ 4시 30분</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TempPage',
  props: {
    msg: String
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temppage {
  width: 100%;
  height: 1100px;
  overflow:hidden;
  background-color: #F5F5F5;
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


</style>
