import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tutorial from "../views/Tutorial.vue";
import Practice from "../views/Practice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: Tutorial,
  },
  {
    path: "/practice",
    name: "Practice",
    component: Practice,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
