export default {
    namespaced: true,
    state: {
        messages: [
            {
                id: 0,
                header: "no access",
                description: "An internal server error is an error on the web server you’re trying to access."
            }
        ]
    }, 
    mutations: {
        pushMessage(state, newValue) {
            let obj = Object.assign(newValue, {id: state.messages.length})
            state.messages.push(obj);
        },
        delleteMessage(state, id) {
              delete state.messages.splice(id, 1);
        }
    },
    actions: {
        pushMessage(context, newValue) {
            context.commit('pushMessage', newValue);
        },
        delleteMessage(context, id) {
            context.commit('delleteMessage', id);
        },
    },
}