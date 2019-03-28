<template>
    <div>
        <h4>Login to FileStorage</h4>
        <div class="listFiles__loginpage">
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
                    email: 'admin@ukr.net',
                    password: '123456',
                },
            }
        },
        computed: {
            dangerShow() {
                return this.$store.getters.dangerShow
            },
            dangerMessage() {
                return this.$store.getters.dangerMessage
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('authUser', this.form);
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
    .listFiles__loginpage {
        width: 400px;
        margin: auto;
        border: 1px solid #f1f3f4;
        padding: 10px;
    }
    h4 {
        text-align: center;
        padding-bottom: 10px;
    }
</style>
