import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index/Index.vue';
import Mapa from '../components/mapaCalor/Map.vue';
import MapaC from '../components/mapaCalidad/MapCal.vue';
import Login from '../components/login/login.vue';

Vue.use(VueRouter);

//Consulta a bd de si esta logeado


const router = new VueRouter({
    routes:[
        { path: '/index', alias:"/", component: Index},
        { path: '/login', name:"login", component: Login},
        { path: '/mapadia', alias: '/dia', component: Mapa, meta: { requiresAuth: true} },
        { path: '/mapacalidad', alias: '/calidad', component: MapaC, meta: { requiresAuth: true} }
    ]
});

// Aqui hay que agregar el tema del logeo, en el true la verificacion si esta logeado 
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (true) {
          next();
    } else {

        next({
            path: '/login',
            query: { redirect: to.fullPath },
          });
      }
    } 
    else {
      next();
    }
  });

export default router
