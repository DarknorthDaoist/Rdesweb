import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router/router.js'
import GoogleAuth from 'vue-google-oauth'

import App from './components/app/app.vue';
Vue.use(VueResource);

Vue.use(GoogleAuth, { client_id: '733813450472-8cbp9pm7du37stt6t3uearrhk9e72hu7.apps.googleusercontent.com' })
Vue.googleAuth().load()
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

