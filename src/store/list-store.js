export default class ListPageStore {
    constructor(URL) {

        this.namespaced = true;
        this.state = {
            files: []
        }
        this.mutations = {
            setFiles(state, value) {
                state.files = value
            }
        }
        this.actions = {
            getList(context) {
                const promise =  fetch(`${URL}/api/UI/StoredFile`, {})

                promise
                .then((response) => {
                        return response.json();
                    }
                )
                .then((response) => {
                        context.commit("setFiles", response);
                    }
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`
                    }, {root: true});
                });
            },

            download(context, idFiles) {
                const query = `${URL}/api/FileManager/DownoaloadFile?ids=${idFiles}`
                const promise = fetch(query);

                promise.then(() => {
                        let link = document.createElement("a");
                        link.href = query;
                        link.click();
                    },
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`
                    }, {root: true});
                });

                return promise;
            },

             deleteFiles(context, idFiles) {
                const query = `${URL}/api/Component/Delete?ids=${idFiles}`;

                const promise = fetch(query, {
                    method: 'DELETE',
                    headers: [
                    ["Content-Type", "application/json"],
                    ],
                })

                promise.then(() => {
                    context.dispatch("getList")
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

