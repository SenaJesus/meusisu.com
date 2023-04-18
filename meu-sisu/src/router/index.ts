import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sobre",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/professorrafael",
      name: "professorrafael",
      component: () => import("../views/ProfessorView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/ErrorPageView.vue"),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/LoginView.vue")
    },
    {
      path: '/erro/:code',
      name: 'error',
      component: () => import("../views/ErrorPageView.vue")
    },
  ],
});

export default router;
