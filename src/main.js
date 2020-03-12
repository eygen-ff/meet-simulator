import Vue from 'vue'
import App from './Pwa.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueTimers from 'vue-timers';
Vue.use(VueTimers);


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
