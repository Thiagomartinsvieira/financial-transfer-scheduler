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
      path: "/schedule",
      name: "schedule",
      component: () => import("../views/ScheduleTransferView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/TransferHistoryView.vue"),
    },
  ],
});

export default router;
