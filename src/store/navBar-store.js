export default {
    namespaced: true,
    state: {
        isLogin: false,
        userEmail: "",
        
    }, 
    mutations: {
        showIcon(state, newValue) {
            state.isLogin = newValue
        },
        setEmail(state, newValue) {
            state.userEmail = newValue
        }
    },
    actions: {
        setEmail(context, newValue) {
            context.commit('setEmail', newValue);
        },
        showIcon(context, newValue) {
            context.commit('showIcon', newValue);
        },
    },
    getters:{
        isLogin (state) {
            return state.isLogin
        },
        userEmail (state) {
            return state.userEmail
        },
    }
}