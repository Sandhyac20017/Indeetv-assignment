import { createRouter, createWebHistory } from "vue-router";
import Login_indee from "../Login_form/Login_indee.vue";

const routes = [
  { path: "/", name: "form", component: Login_indee },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import( '../Login_form/Terms.vue'), 
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
