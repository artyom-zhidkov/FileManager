export default class FileDetailsStore {
    constructor(URL) {
        this.namespaced = true;
        this.state = {
            file: null
        }
        this.mutations = {
            setFiles(state, value) {
                state.file = value;
            }
        }
        this.actions = {
            getFile(context, id) {
                const promise = fetch(`${URL}/api/Component/${id}`);

                promise.then(
                    (response) => {
                        return response.json();
                    }
                )
                .then((res) => {
                    context.commit("setFiles", res);
                }).catch(() => {

                });

                return promise;
            },
        }
        this.getters = {
            getFileDetails(state) {
                // let temp = state.file;
                // delete temp[0].chunkData;
                // return temp;
                return state.file;
            }
        }
    }
}

