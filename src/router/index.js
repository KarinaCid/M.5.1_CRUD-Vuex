import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from 'firebase'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    alias: ["/login"],
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      login:true
    }
  },
  {
    path: "/beer/:beerId",
    name: "Beer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "beer" */ "../views/Beer.vue"),
    props : true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser

  let authRequired = to.matched.some(route => route.meta.login)
  if(!user && authRequired){
    next('/login')
  } else {
    next()
  }
})

export default router;
