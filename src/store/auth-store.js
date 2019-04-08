import httpClient from '../utils/httpClient';
export default class AuthUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            authUser(context, body) {
                const promise = httpClient.POST(`${URL}/api/AccountMongo/Register`, body);

                promise
                .then(() => {
                        return context.dispatch("navBarStore/setEmail", body.email, {root: true});
                    }
                )
                .catch((error) => {
                    if (error.message === "Not Acceptable") {
                        context.dispatch('errorMessageStore/pushMessage', {
                            header: `${error.message}`,
                            description: `User with this data is already registered`,
                            variant: "warning",
                            timeShown: 8000
                        }, {root: true});
                        return;
                    }
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: `Server is not available ${error}`,
                        description: `The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.`,
                        variant: "danger",
                        timeShown: 8000
                    }, {root: true});
                    
                });
            }
        }
    }
}

