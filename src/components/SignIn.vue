<template>
  <div class="signin">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <div class="ip_row">
      <span>토큰</span>
      <div>
        <input v-model="token" placeholder="토큰값을 입력해주세요.">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.logo {
  margin: 120px 0 80px;
  width: 50%;
}
.ip_row {
  margin: 0 30px 10px;
}
.ip_row span {
  float: left;
  width: 20%;
}
.ip_row div {
  float: right;
  width: 80%;
}
.ip_row div input {
  width: 100%;
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
