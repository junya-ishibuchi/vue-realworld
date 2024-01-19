import { createApp } from "vue";
import App from "./App.vue";
import Register from "./features/register/Register.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NewArticle from "./features/articles/edit/NewArticle.vue";
import Login from "./features/login/Login.vue";

const Home = { template: "<div>Home</div>" };
const routes: RouteRecordRaw[] = [
  { name: "home", path: "/", component: Home },
  { name: "login", path: "/login", component: Login },
  { name: "register", path: "/register", component: Register },
  { name: "editor", path: "/editor", component: NewArticle },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
createApp(App).use(router).mount("#app");
