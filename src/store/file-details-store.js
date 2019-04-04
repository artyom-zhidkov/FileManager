export default class FileDetailsStore {
    constructor(URL) {
        this.namespaced = true;
        this.state = {
            file: null
        }
        this.mutations = {
            setFile(state, value) {
                state.file = value;
            }
        }
        this.actions = {
            getFile(context, id) {
                const promise = fetch(`${URL}/api/UI/${id}`)
                
                promise.then((response) => {
                        context.commit("setFile", response.json());
                    }
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`
                    }, {root: true});
                });

                return promise;
            }
        }
    }
}

