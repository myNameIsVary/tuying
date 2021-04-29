import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import {Tab, Tabs} from 'vant';
import 'vant/lib/index.css';

Vue.use(Tab);
Vue.use(Tabs);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
