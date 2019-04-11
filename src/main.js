import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import VueCookies from 'vue-cookies';
import router from './router';
import createStores from './store';
import BootstrapVue from 'bootstrap-vue';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueCookies);

Vue.config.productionTip = false;

const store = createStores();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
