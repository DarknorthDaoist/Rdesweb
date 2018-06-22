import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router/router.js'
import App from './components/app/app.vue';
import Login from './components/login/login.vue';
require("./style.scss");
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(Login)
})

