export default {
    namespaced: true,
    state: {
        userEmail: ""
    }, 
    mutations: {
        setEmail(state, newValue) {
            state.userEmail = newValue
        }
    },
    actions: {
        setEmail(context, newValue) {
            context.commit('setEmail', newValue);
        },
    },
}