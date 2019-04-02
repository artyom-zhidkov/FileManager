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
                fetch(`${URL}/api/Component`, {})
                .then(
                    (response) => {
                        return response.json();
                    },
                    (error) => {
                        window.console.error("Rejected: " + error);
                    }
                )
                .then((res) => {
                    context.commit("setFiles", res);
                });
            },
            download(context, idFiles) {
                const query = `${URL}/api/FileManager/DownoaloadFile?ids=${idFiles}`
                fetch(query)
                .then(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        window.console.error("Rejected: " + error);
                    }
                )
                .then(() => {
                    let link = document.createElement("a");
                    link.href = query;
                    link.click();
                });
            },
             deleteFiles(context, idFiles) {
                const query = `${URL}/api/Component/Delete?ids=${idFiles}`
                return fetch(query, {
                    method: 'DELETE',
                    headers: [
                    ["Content-Type", "application/json"],
                    ],
                })
            }
        }
    }
}

