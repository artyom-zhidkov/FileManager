export default class AuthUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            authUser(context, body) {
                const promise = fetch(`${URL}/api/AccountMongo/Register`, {
                    method: 'POST',
                    headers: [
                        ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(body)
                });

                promise
                .then((res) => {
                        if (res.ok) {
                            return context.dispatch("navBarStore/setEmail", body.email, {root: true});
                        }
                        throw new Error(res.statusText);
                    }
                )
                .catch((error) => {

                    if (error.message === "Unauthorized") {
                        context.dispatch('errorMessageStore/pushMessage', {
                            header: `${error.message}`,
                            description: `The request has not been applied because it lacks valid authentication credentials for the target resource.`,
                            variant: "warning"
                        }, {root: true});
                        return;
                    }
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: `NOT FOUND`,
                        description: `The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.`,
                        variant: "danger"
                    }, {root: true});
                    
                });

                return promise;
            }
        }
    }
}

