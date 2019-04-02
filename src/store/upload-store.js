
export default class UploadStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            uploadChunks(context, body) {
                return fetch(`${URL}/api/FileManager/InputChunksNew`, {
                    method: 'POST',
                    headers: [
                    ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(body)
                })
                // return new Promise((resolve) => {
                //     setTimeout(()=>{
                //         resolve();
                //     },1000)
                // })
            }
        }
    }
}
