import Vue from 'vue'
import App from './App.vue'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import Vuex from 'vuex';
import makeStore from './State';

import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.use(Vuex);
Vue.config.productionTip = false

const store = makeStore();

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
