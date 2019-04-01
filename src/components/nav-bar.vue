<template>
    <div class="listFiles__navbar">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand @click="HomePage" href="#">FileStorage</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse" />
            <b-collapse is-nav id="nav_collapse">
                <!-- Right-->
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav class="listFiles__navbar_button">
                        <b-nav-item v-show="!isLogin"
                                    @click="loginPage" href="#">Log in</b-nav-item>
                    </b-navbar-nav>
                    <b-button v-show="!isLogin" size="sm" class="listFiles__navbar_button"
                              variant="outline-light" type="submit" @click="AuthPage">Sign up</b-button>
                    <b-navbar-brand href="#">
                        <i v-show="isLogin" class="fas fa-user-check"></i>
                    </b-navbar-brand>
                    <b-nav-item-dropdown v-show="isLogin" right>
                            <template slot="button-content">
                                <em>{{userEmail}}</em>
                            </template>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </template>

    <script>
        export default {
            name: "nav-bar",
            computed: {
                isLogin() {
                    return this.$store.state.navbar.isLogin
                },
                userEmail() {
                    return this.$store.state.navbar.userEmail
                },
            },
            methods: {
                logout() {
                    if (this.$cookies.isKey("keyName")) {
                        this.$cookies.remove("keyName");
                        this.$store.dispatch("navbar/showIcon", false);
                        this.$router.push({ path: 'home' });
                    }
                },
                loginPage() {
                    this.$router.push({ path: 'login' });
                },
                AuthPage() {
                    this.$router.push({ path: 'auth' });
                },
                HomePage() {
                    this.$router.push({ path: 'home' });
                }
            },
            created() {
                if (this.$cookies.isKey("keyName")) {
                    this.$store.dispatch("navbar/setEmail", this.$cookies.get("keyName"));
                    this.$store.dispatch("navbar/showIcon", true);
                }
            }
        }
    </script>

    <style scoped lang="scss">
    </style>