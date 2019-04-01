export default class LoginUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            login(context, body) {
            return fetch(`${URL}/api/AccountMongo/Login`, {
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

