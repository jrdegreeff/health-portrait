import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import helpers from './helpers';

Vue.config.productionTip = false;

Vue.use(helpers, { store });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
