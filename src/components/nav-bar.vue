<template>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <router-link class="logo" to="home">FileManager</router-link>
            <b-navbar-toggle target="nav_collapse" />
            <b-collapse is-nav id="nav_collapse">
                <!-- Right-->
                <b-navbar-nav class="ml-auto d-flex align-items-end">
                    <router-link class="button m-1" :show="!isLogin" to="login">Log in</router-link> 
                    <router-link class="button button-sign-up m-1" :show="!isLogin" to="auth">Sign up</router-link> 
                    <b-navbar-brand href="#">
                        <i v-show="isLogin" class="fas fa-user-check ml-2"></i>
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
    </template>

    <script>
        export default {
            name: "nav-bar",
            computed: {
                userEmail() {
                    return this.$store.state.navBarStore.userEmail
                },
                isLogin() {
                    return Boolean(this.$store.state.navBarStore.userEmail.length)
                },
            },
            methods: {
                logout() {
                    if (this.$cookies.isKey("keyName")) {
                        this.$cookies.remove("keyName");
                        this.$store.dispatch("navBarStore/setEmail", "");
                        this.$router.push({ path: 'home' });
                    }
                }
            },
            created() {
                if (this.$cookies.isKey("keyName")) {
                    this.$store.dispatch("navBarStore/setEmail", this.$cookies.get("keyName"));
                }
            }
        }
    </script>

    <style scoped lang="scss">
        .button {
            padding: 5px 10px;
            color: white;
            text-decoration-line: none;
            width: 80px;
            text-align: center;
            border: solid 1px #17a2b8;

            &.button:hover {
                border: solid 1px white;
                border-radius: 3px;
            }

            &.button-sign-up {
                border: solid 1px white;
                border-radius: 3px;
            }
            
            &.button-sign-up:hover {
                color: grey;
                background: white;
            }

        }

        .logo {
            color: white;
            font-size: large;
            font-weight: 600;
            text-decoration-line: none;
        }
    </style>