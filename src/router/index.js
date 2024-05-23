// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue'; // 예시로 MainPage 컴포넌트를 import
import AddrPage from '../components/AddrPage.vue';
import AddrPage2 from '../components/AddrPage2.vue';
import AddrPage3 from '../components/AddrPage3.vue';
import ItemPage from '../components/ItemPage.vue';
import OrderPage from '../components/OrderPage.vue';
import ProcPage from '../components/ProcPage.vue';
import SelPage from '../components/SelPage.vue';
import SignIn from '../components/SignIn.vue';
import TempPage from '../components/TempPage.vue';
import UserPage from '../components/UserPage.vue';
import UserPage2 from '../components/UserPage2.vue';
import DatePage from '../components/DatePage.vue';



const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/addr',
    name: 'AddrPage',
    component: AddrPage
  },
  {
    path: '/item',
    name: 'ItemPage',
    component: ItemPage
  },
  {
    path: '/order',
    name: 'OrderPage',
    component: OrderPage
  },
  {
    path: '/proc',
    name: 'ProcPage',
    component: ProcPage
  },
  {
    path: '/sel',
    name: 'SelPage',
    component: SelPage
  },
  {
    path: '/date',
    name: 'DatePage',
    component: DatePage
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/temp',
    name: 'TempPage',
    component: TempPage
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/user2',
    name: 'UserPage2',
    component: UserPage2
  },
  {
    path: '/addr2',
    name: 'AddrPage2',
    component: AddrPage2
  },
  {
    path: '/addr3',
    name: 'AddrPage3',
    component: AddrPage3
  },
  // 다른 경로에 대한 라우트 설정
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
