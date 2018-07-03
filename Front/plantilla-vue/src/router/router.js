import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index/Index.vue';
import Mapa from '../components/mapaCalor/Map.vue';
import MapaC from '../components/mapaCalidad/MapCal.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/index', alias: '/', component: Index},
    { path: '/mapadia', alias: '/dia', component: Mapa},
    { path: '/mapacalidad', alias: '/calidad', component: MapaC}

]
export default new VueRouter({routes})
