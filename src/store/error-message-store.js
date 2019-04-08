export default {
    namespaced: true,
    state: {
        messages: []
    }, 
    mutations: {
        pushMessage(state, message) {
            state.messages.push(message);
        },
        delleteMessage(state, id) {
            delete state.messages.splice(id, 1);
        }
    },
    actions: {
        pushMessage(context, message) {
            context.commit('pushMessage', message);
            var self = context;
            setTimeout(function(){
                self.commit('delleteMessage', self.state.messages.length - 1)
            }, message.timeShown);

        },
        delleteMessage(context, id) {
            context.commit('delleteMessage', id);
        },
    },
}