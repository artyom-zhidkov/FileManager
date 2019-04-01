export default class AuthUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            authUser(context, body) {
                return fetch(`${URL}/api/AccountMongo/Register`, {
                    method: 'POST',
                    headers: [
                    ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(body)
                })
            }
        }
    }
}

