import Vue from 'vue';
import krouter from '@/krouter';
import App from './App.vue';
import store from './store';
// import router from './router';

Vue.config.productionTip = false;

new Vue({
  krouter,
  store,
  // router,
  render: (h) => h(App),
}).$mount('#app');
