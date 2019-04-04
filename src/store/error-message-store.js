export default {
    namespaced: true,
    state: {
        messages: []
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
            var self = context;
            setTimeout(function(){
                self.commit('delleteMessage', self.state.messages.length - 1)
            }, 6000);

        },
        delleteMessage(context, id) {
            context.commit('delleteMessage', id);
        },
    },
}