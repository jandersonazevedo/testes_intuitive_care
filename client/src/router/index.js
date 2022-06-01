import { createRouter, createWebHistory } from "vue-router";
import OperadorasAtivas from "../views/OperadorasAtivas.vue";

const routes = [
  {
    path: "/",
    name: "OperadorasAtivas",
    component: OperadorasAtivas,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
