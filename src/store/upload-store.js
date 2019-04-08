import httpClient from '../utils/httpClient';
export default class UploadStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            uploadChunks(context, body) {
                const promise = httpClient.POST(`${URL}/api/FileManager/InputChunksNew`, body);

                promise.catch((err) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: "Server is not available",
                        description: `${err}`,
                        variant: "danger",
                        timeShown: 8000
                    }, {root: true});
                });

                return promise
            }
        }
    }
}
