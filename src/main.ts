import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Register from "./features/register/Register.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const Home = { template: "<div>Home</div>" };
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
createApp(App).use(router).mount("#app");
