export default {
    namespaced: true,
    state: {
        messages: []
    }, 
    mutations: {
        pushMessage(state, newValue) {
            state.messages.push(newValue);
        },
        delleteMessage(state, id) {
            delete state.messages.splice(id, 1);
        }
    },
    actions: {
        pushMessage(context, newValue) {
            context.commit('pushMessage', newValue);
            var self = context;
            setTimeout(function(){
                self.commit('delleteMessage', self.state.messages.length - 1)
            }, 8000);

        },
        delleteMessage(context, id) {
            context.commit('delleteMessage', id);
        },
    },
}