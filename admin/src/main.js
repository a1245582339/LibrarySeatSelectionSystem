import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import './permission'
import Vant from 'vant';
import 'vant/lib/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(Vant);
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
