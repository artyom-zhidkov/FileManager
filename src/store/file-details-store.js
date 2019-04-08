import httpClient from '../utils/httpClient';
export default class FileDetailsStore {
    constructor(URL) {
        this.namespaced = true;
        this.state = {
            file: {}
        }
        this.mutations = {
            setFile(state, value) {
                state.file = value;
            }
        }
        this.actions = {
            getFile(context, id) {
                httpClient.GET(`${URL}/api/UI/${id}`)
                .then((response) => {
                        return response.json();
                    }
                )
                .then((response) => {
                        context.commit("setFile", response);
                    }
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`,
                        variant: "danger",
                        timeShown: 8000
                    }, {root: true});
                });
            }
        }
    }
}

