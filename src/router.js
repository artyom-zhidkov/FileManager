import Vue from 'vue';
import VueRouter from "vue-router";

import listPage from "./components/list-page";
import homePage from "./components/home-page";
import loginPage from "./components/login-page";
import authPage from "./components/auth-page";
import fileDetailsPage from "./components/file-details-page";

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: "/list" },
    { path: '/home', component: homePage },
    { path: '/login', component: loginPage },
    { path: '/auth', component: authPage },
    { path: '/list', component: listPage },
    { path: '/list/:id', component: fileDetailsPage }
];

const router = new VueRouter({
    routes
});

export default router