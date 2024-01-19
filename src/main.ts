import { createApp } from "vue";
import App from "./App.vue";
import Register from "./features/register/Register.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NewArticle from "./features/articles/edit/NewArticle.vue";

const Home = { template: "<div>Home</div>" };
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/editor", component: NewArticle },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
createApp(App).use(router).mount("#app");
