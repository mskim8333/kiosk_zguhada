<template>
  <div class="procpage">
    <div class="procpage_top">
      <div class="procpage_bg">
        <img class="bg_logo" alt="logo" src="../assets/bg2.png">  
      </div>
      <div class="logo_wrap">
        <img class="logo" alt="logo" src="../assets/main_camp2.png">
      </div>
    </div>
    <div class="procpage_bottom">
      <img class="camp" src="../assets/camp.png">
      <div class="btn_wrap">
        <router-link class="btn" to="/addr">배출 신청하기</router-link>
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
/*
.procpage_top {
  background: url(../assets/bg2.png);
  background-size: cover;
  width: 100%;
  height: 1100px;
  overflow:hidden;
}
*/
.procpage_top {
  /*
  background: url(../assets/bg.png);
  background: url(file:///images/assets/bg.png);
  */
  width: 100%;
  height: 45%;
  overflow:hidden;
}
.procpage_bg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.bg_logo {
  width: 100%;
  height: 100%;
}
.procpage_bottom {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50%;
}

.logo_wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  text-align:center;
}
img.logo {
  margin: 200px 0 100px;
  width: 60%;
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
  display: inline-block;
  text-decoration: none;
  background-color: #1E64FF;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 24px;
  width: 100%;
  line-height: 100px;
  height: 100px;
  border: 0px;
}

</style>
