// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 위에서 만든 router를 import

const app = createApp(App);
app.use(router); // router를 사용합니다.
app.mount('#app');
