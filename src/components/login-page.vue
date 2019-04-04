<template>
    <div>
        <h4 class="text-center pb-2">Login to FileStorage</h4>
        <div class="login-form p-2">
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                <b-form-group label="Email address:" label-for="email">
                    <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email" />
                </b-form-group>
                <b-form-group label="Password:" label-for="password">
                    <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />
                </b-form-group>
                <b-button class="mr-2" type="submit" variant="primary">Login</b-button>
                <b-button type="reset" variant="outline-primary">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login-page",
        data() {
            return {
                form: {
                    email: '@ukr.net',
                    password: '123456',
                }
            }
        },
        methods: {
            onSubmit() {
                const self = this;
                const promise = this.$store.dispatch('loginUserStore/login', self.form)
                promise.then((res) => {
                    if (res.ok) {
                        self.$cookies.set("keyName", this.form.email);
                        self.$router.push({ path: 'list' });
                    }
                })
            },
            onReset() {
                this.form.email = '';
                this.form.password = '';
            }
        }
    }
</script>

<style scoped>
    .login-form {
        max-width: 400px;
        margin: auto;
        border: 1px solid #f1f3f4;
    }
</style>
