<template>
    <div>
        <h4 class="text-center pb-2">Create your personal account</h4>
        <div class="auth-form p-2">
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
                <b-button type="reset" variant="outline-primary">Reset</b-button>
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
                    email: 'aaa@ukr.net',
                    password: '1234',
                    confirmPassword: '1234'
                }
            }
        },
        methods: {
            authUser() {
                if (this.form.password != this.form.confirmPassword) {
                    this.$store.dispatch('errorMessageStore/pushMessage', {
                            header: `The Confirm Password confirmation does not match`,
                            description: `Please, Enter correct value `,
                            variant: "warning",
                            timeShown: 5000
                        }, {root: true});
                        return;
                }
                if (this.form.password.length < 5) {
                    this.$store.dispatch('errorMessageStore/pushMessage', {
                            header: `The Password field must be at least 5 characters`,
                            description: `Please, Enter correct value `,
                            variant: "warning",
                            timeShown: 5000
                        }, {root: true});
                        return;
                }
                const self = this;
                const promise = this.$store.dispatch('authUserStore/authUser', this.form)
                promise.then(() => {
                    self.$cookies.set("keyName", this.form.email);
                    self.$router.push({ path: 'list' });
                })
            },
            onReset() {
                this.form.email = '';
                this.form.password = '';
                this.form.confirmPassword = '';
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
