
import Vuex from 'vuex'

import AuthUserStore from "./auth-store";
import LoginUserStore from "./login-store";
import UploadStore from './uploadStore';
import ListStore from './list-store';
import FileDetailsStore from './file-details-store';
import navbar from './navBar-store';

const URL = "http://172.22.61.69:9999";


const loginUserStore = new LoginUserStore(URL);
const authUserStore = new AuthUserStore(URL);
const uploadStore = new UploadStore(URL);
const listStore = new ListStore(URL);
const fileDetailsStore = new FileDetailsStore(URL);


export default () => {
    const modules = {
        loginUserStore,
        authUserStore,
        uploadStore,
        listStore,
        fileDetailsStore,
        navbar
    };

    return new Vuex.Store({
        modules
    });
};
