import { createWebHistory, createRouter } from "vue-router";
import PlHome from "./views/pl-home.vue"
import PlSetting from "./views/pl-setting.vue"

const routes = [
  {
    path: "/",
    component: PlHome,
  },
  {
    path: "/setting",
    component: PlSetting,
  }
];

const router = createRouter({
  history: createWebHistory('https://litvinpavel.github.io/salary-calendar/'),
  routes,
});

export default router;