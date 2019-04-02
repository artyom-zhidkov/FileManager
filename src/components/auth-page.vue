<template>
    <div>
        <h4 class="text-center pb-2">Create your personal account</h4>
        <div class="auth-form p-2">
            <b-alert variant="danger" v-model="dangerShow">{{dangerMessage}}</b-alert>
            <b-form @submit.prevent="authUser" @reset.prevent="onReset">
                <b-form-group label="Email address:" label-for="email">
                    <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email" />
                </b-form-group>
                <b-form-group label="Password:" label-for="password">
                    <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />
                </b-form-group>
                <b-form-group label="Confirm:" label-for="password">
                    <b-form-input id="confirmPassword" type="password" v-model="form.confirmPassword" required placeholder="Enter password" />
                </b-form-group>
                <b-button class="mr-2" type="submit" variant="primary">Create an account</b-button>
            </b-form>
        </div>
    </div>

</template>

<script>
    export default {
        name: "auth-page",
        data() {
            return {
                form: {
                    email: 'a@ukr.net',
                    password: '123',
                    confirmPassword: '123'
                },
                dangerMessage: "No access",
                dangerShow: false
            }
        },
        methods: {
            authUser() {
                const self = this;
                this.$store.dispatch('authUserStore/authUser', this.form)
                .then(
                    () => {
                        self.$cookies.set("keyName", this.form.email);
                        self.$store.dispatch("navbar/showIcon", true);
                        self.$store.dispatch("navbar/setEmail", this.form.email);
                        self.$router.push({ path: 'list' });
                    },
                    () => {
                        self.$store.dispatch('errorMessageStore/pushMessage', {
                            header: "Server is not available",
                            description: "Server is not available"
                        });
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        self.$cookies.set("keyName", this.form.email);
                        self.$store.dispatch("navbar/showIcon", true);
                        self.$store.dispatch("navbar/setEmail", this.form.email);
                        self.$router.push({ path: 'list' });
                    }
                    if (res.status === 400) {
                        self.$store.dispatch('errorMessageStore/pushMessage', {
                            header: "Passwords do not match",
                            description: "Passwords do not match"
                        });

                    }
                });
            },
            onReset() {
                this.form.email = '';
                this.form.password = '';
                this.dangerShow = false;
            }
        },
        
    }
</script>

<style scoped>
    .auth-form {
        max-width: 400px;
        margin: auto;
        border: 1px solid #f1f3f4;
    }
</style>
