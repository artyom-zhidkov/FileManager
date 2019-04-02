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
                return fetch(`${URL}/api/Component/${id}`);
            }
        }
    }
}

