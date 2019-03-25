import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
