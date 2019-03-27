import Vue from 'vue';
import VueRouter from "vue-router";
import ListPage from "./components/list/ListPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AuthPage from "./components/AuthPage";
import IdPage from "./components/list/IdPage";

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: "/list" },
    { path: '/home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/auth', component: AuthPage },
    { path: '/list', component: ListPage },
    { path: '/list/:id', component: IdPage }
];

const router = new VueRouter({
    routes
});

export default router