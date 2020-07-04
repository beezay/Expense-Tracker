import Vue from 'vue'
import vuerouter from 'vue-router';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

Vue.use(vuerouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})