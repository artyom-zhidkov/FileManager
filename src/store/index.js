
import Vuex from 'vuex'

import AuthUserStore from "./auth-store";
import LoginUserStore from "./login-store";
import UploadStore from './uploadStore';
import ListPageStore from './list-store';
import IdStore from './id-store';
import TestStore from './test.store';
import Navbar from './navBar-store';

const URL = "http://172.22.61.38:9999";


const loginUserStore = new LoginUserStore(URL);
const authUserStore = new AuthUserStore(URL);
const uploadStore = new UploadStore(URL);
const listPageStore = new ListPageStore(URL);
const idStore = new IdStore(URL);
const testStore = new TestStore(URL);
const navbar = new Navbar(URL);


export default () => {
    const modules = {
        loginUserStore,
        authUserStore,
        uploadStore,
        listPageStore,
        idStore,
        testStore,
        navbar
    };

    return new Vuex.Store({
        modules
    });
};
