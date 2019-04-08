import httpClient from '../utils/httpClient';
export default class LoginUserStore {
    constructor(URL) {
        this.namespaced = true;
        this.actions = {
            login(context, body) {

                const promise = httpClient.POST(`${URL}/api/AccountMongo/Login`, body);

                promise
                .then(() => {
                        return context.dispatch("navBarStore/setEmail", body.email, {root: true});
                    }
                )
                .catch((error) => {
                    if (error.message === "Unauthorized") {
                        context.dispatch('errorMessageStore/pushMessage', {
                            header: `${error.message}`,
                            description: `The request has not been applied because it lacks valid authentication credentials for the target resource.`,
                            variant: "warning",
                            timeShown: 8000
                        }, {root: true});
                        return;
                    }
                    context.dispatch('errorMessageStore/pushMessage', {
                        header: `Server is not available`,
                        description: `The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.`,
                        variant: "danger",
                        timeShown: 8000
                    }, {root: true});
                });

                return promise;
            }    
        }
    }
}