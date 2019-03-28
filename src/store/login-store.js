export default class LoginUserStore {
    constructor(URL) {
        this.state = {
            dangerMessage: "No access",
            dangerShow: false
        }
        this.mutations = {
            setDangerMessage(state, value) {
                state.dangerMessage = value
            },
            setDangerShow(state, value) {
                state.dangerShow = value
            }
        }
        this.actions = {
            login(context, body) {
            return fetch(`${URL}/api/AccountMongo/Login`, {
                method: 'POST',
                headers: [
                    ["Content-Type", "application/json"],
                ],
                body: JSON.stringify(body)
                })
                .then(
                    (response) => {
                        return response;
                    },
                    () => {
                        this.commit('dangerMessage', "Server is not available");
                        this.commit('dangerShow', true);
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        this.$cookies.set("keyName", this.form.email);
                        this.$store.dispatch("showIcon", true);
                        this.$store.dispatch("setEmail", this.form.email);
                        this.$router.push({ path: 'list' });
                    }
                    if (res.status === 401) {
                        this.commit('dangerShow', true);
                        this.commit('dangerMessage', "You don't have access rights");
                    }
                });
            }
        }
        this.getters = {
            dangerMessage (state) {
                return state.dangerMessage
            },
            dangerShow (state) {
                return state.dangerShow
            },
        }
    }
}

