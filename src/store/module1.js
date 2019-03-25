export default {
    state: {
        isLogin: false,
        userEmail: "",
        SERVER: "172.22.61.38:9999"
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
        uploadChunks(context, body) {
            return fetch(`http://172.22.61.38:9999/api/FileManager/InputChunksNew`, {
                method: 'POST',
                headers: [
                ["Content-Type", "application/json"],
                ],
                body: JSON.stringify(body)
            })
        }
        // uploadChunks(context, body) {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             // console("dee")
        //             resolve();
        //         }, 1000)
        //     })
        // }
            
    },
    getters:{
        isLogin (state) {
            return state.isLogin
        },
        userEmail (state) {
            return state.userEmail
        },
        SERVER (state) {
            return state.SERVER
        }
    }
}
