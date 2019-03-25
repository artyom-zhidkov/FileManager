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
        name: "LoginPage",
        data() {
            return {
                form: {
                    email: 'admin@ukr.net',
                    password: '123456',
                },
                dangerShow: false,
                dangerMessage: "No access"
            }
        },
        computed: {
            SERVER() {
                return this.$store.getters.SERVER
            }
        },
        methods: {
            onSubmit() {
                fetch(`http://${this.SERVER}/api/Account/Login`, {
                    method: 'POST',
                    headers: [
                        ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(this.form)
                })
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
                            this.$store.dispatch("showIcon", true);
                            this.$store.dispatch("setEmail", this.form.email);
                            this.$router.push({ path: 'list' });
                        }
                        if (res.status === 401) {
                            this.dangerShow = true;
                            this.dangerMessage = "You don't have access rights";
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
