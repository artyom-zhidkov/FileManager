import Vuex from 'vuex'

import AuthUserStore from "./auth-store";
import LoginUserStore from "./login-store";
import UploadStore from './upload-store';
import ListStore from './list-store';
import FileDetailsStore from './file-details-store';
import navBarStore from './navBar-store';
import errorMessageStore from './error-message-store';

const URL = "http://172.31.82.145:1111";

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
        navBarStore,
        errorMessageStore,
    };

    return new Vuex.Store({
        modules
    });
};
