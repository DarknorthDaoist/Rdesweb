import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index/Index.vue';
import Mapa from '../components/mapaCalor/Map.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/index', alias: '/', component: Index},
    { path: '/mapa', alias: '/map', component: Mapa}
]
export default new VueRouter({routes})
