export default class LoginUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            login(context, body) {
                const promise = fetch(`${URL}/api/AccountMongo/Login`, {
                    method: 'POST',
                    headers: [
                        ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(body)
                })
                
                promise
                .then((res) => {
                        if (res.ok) {
                            return context.dispatch("navBarStore/setEmail", body.email, {root: true});
                        }
                        throw new Error(res.statusText);
                    }, 
                )
                .catch((error) => {
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: `Problem with your fetch operation:`,
                        description: `${error.message}`
                    }, {root: true});
                    return false
                });

                return promise;
            }    
        }
    }
}