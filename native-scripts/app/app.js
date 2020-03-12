import Vue from "nativescript-vue";

import routes from "./routes";
import BackendService from "./services/backend-service";

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;
//Vue.prototype.$nsUuid = nsUuid;

new Vue({
  created() {
    //backendService.autoLogin(nsUuid.getUUID())
  },
  data() {
  },
  render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
