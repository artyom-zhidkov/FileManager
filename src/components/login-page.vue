<template>
    <div>
        <h4 class="text-center pb-2">Login to FileStorage</h4>
        <div class="login-form p-2">
            <b-alert variant="danger" v-model="dangerShow">{{dangerMessage}}</b-alert>
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
                    email: 'Admin@ukr.net',
                    password: '123456',
                },
                dangerMessage: "No access",
                dangerShow: false
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('loginUserStore/login', this.form)
                .then(
                    (response) => {
                        return response;
                    },
                    () => {
                        this.dangerMessage = "Server is not available";
                        this.dangerShow = true;
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        this.$cookies.set("keyName", this.form.email);
                        this.$store.dispatch("navbar/showIcon", true);
                        this.$store.dispatch("navbar/setEmail", this.form.email);
                        this.$router.push({ path: 'list' });
                    }
                    if (res.status === 401) {
                        this.dangerMessage = "You don't have access rights";
                        this.dangerShow = true;
                    }
                });
            },
            onReset() {
                this.form.email = '';
                this.form.password = '';
                this.dangerShow = false;
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
