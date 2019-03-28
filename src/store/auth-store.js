export default class AuthUserStore {
    constructor(URL) {
        // this.state = {
        //     dangerMessage: "No access",
        //     dangerShow: false
        // }
        // this.mutations = {
        //     setDangerMessage(state, value) {
        //         state.dangerMessage = value
        //     },
        //     setDangerShow(state, value) {
        //         state.dangerShow = value
        //     }
        // }

        
        this.actions = {
            authUser(context, body) {
                return fetch(`${URL}/api/AccountMongo/Register`, {
                    method: 'POST',
                    headers: [
                    ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(body)
                })
            }
        },
                // .then(
                //     (response) => {
                //         return response;
                //     },
                //     () => {
                //         // this.commit('dangerMessage', "Server is not available");
                //         // this.commit('dangerShow', true);
                //     }
                // )
                // .then((res) => {
                //     if (res.status === 400) {
                //         // this.commit('dangerShow', true);
                //         // this.commit('dangerMessage', "Passwords do not match");
                //     } else {
        
        this.getters = {
            // dangerMessage (state) {
            //     return state.dangerMessage
            // },
            // dangerShow (state) {
            //     return state.dangerShow
            // },
        }
    }
}

