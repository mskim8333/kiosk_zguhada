<template>
  <div class="procpage">
    <div class="procpage_top">
      <img class="logo" alt="logo" src="../assets/main_camp2.png">
    </div>
    <div class="procpage_bottom">
      <img class="camp" src="../assets/camp.png">
      <div class="btn_wrap">
        <button class="btn">배출 신청하기</button>
      </div>
      
    </div>
</div>
</template>

<script>
export default {
  name: 'ProcPage',
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
.procpage_top {
  background: url(../assets/bg2.png);
  background-size: cover;
  width: 100%;
  height: 1100px;
  overflow:hidden;
}
.procpage_bottom {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 550px;
}

img.logo {
  margin: 140px 0 100px;
  width: 50%;
}
img.camp {
  float:right;
  margin: 80px 0px 0px;
  width: 80%;
}

.btn_wrap {
  margin: 0px;
  width: calc(100% - 40px);
  padding: 0px 20px;
}
.btn {
  background-color: #1E64FF;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 24px;
  width: 100%;
  height: 60px;
  border: 0px;
}

</style>
