import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index/Index.vue';
import Mapa from '../components/mapaCalor/Map.vue';
import MapaC from '../components/mapaCalidad/MapCal.vue';
import Login from '../components/login/login.vue';

Vue.use(VueRouter);

//Consulta a bd de si esta logeado


const router = new VueRouter({
    routes: [
        { path: '/index', alias: "/", name: "inicio", component:Mapa, meta: { requiresAuth: false } },
        // { path: '/login', name: "login", component: Login,meta: { requiresLogin: true } },
        { path: '/', alias: '/',name:"dia", component: Mapa, meta: { requiresAuth:false } },
        { path: '/mapacalidad', alias: '/calidad', component: MapaC, meta: { requiresAuth: false } }
    ]
});

// Aqui hay que agregar el tema del logeo, en el true la verificacion si esta logeado 
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem('auth') == null) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {

            next();
        }
    }
    else if (to.matched.some(record => record.meta.requiresLogin)) {
        if (sessionStorage.getItem('auth') == null) {
            next();
        } else {
                next({
                    path: '/dia',
                    query: { redirect: to.fullPath },
                });

        }
     
    }

    else {
        next();
    }
});

export default router

