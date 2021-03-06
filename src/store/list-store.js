import httpClient from '../utils/httpClient';
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
                const promise = httpClient.GET(`${URL}/api/UI/StoredFile`)
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
                        description: `${err}`,
                        variant: "danger",
                        timeShown: 8000
                    }, {root: true});
                });
            },

            download(context, idFiles) {
                const query = `${URL}/api/FileManager/DownoaloadFile?ids=${idFiles}`;
                const promise = httpClient.GET(`${URL}/api/FileManager/DownoaloadFile?ids=${idFiles}`);

                promise.then(() => {
                        const link = document.createElement("a");
                        link.href = query;
                        link.click();
                    },
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`,
                        variant: "danger"
                    }, {root: true});
                });
            },

             deleteFiles(context, idFiles) {
                const query = `${URL}/api/Component/Delete?ids=${idFiles}`;

                const promise = httpClient.DELETE(query)

                promise.then(() => {
                    context.dispatch("getList");
                    }
                )
                .catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`,
                        variant: "danger"
                    }, {root: true});
                });
            }
        }
    }
}

