import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import JokeCategory from "../pages/JokeCategory.vue";
import Search from "../pages/Search.vue";
import Favorites from "../pages/Favorites.vue";
const isAuthenticated = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.length > 0;
};

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/categories",
    name: "JokeCategory",
    component: JokeCategory,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
