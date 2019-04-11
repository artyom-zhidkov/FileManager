<template>
    <div class="main_container">
        <div class="main_container d-flex align-self-stretch flex-column">
            <div>
                <header>
                    <nav-bar></nav-bar>
                </header>
                <main class="p-3">
                    <router-view></router-view>
                </main>
            </div>
            <div class="mt-auto">
                <footer class="bg-info text-white">
                    <div class="footer-copyright text-center py-3">© 2019 Copyright</div>
                </footer>
            </div>
        </div>
        <error-message class="er-message position-absolute"></error-message>
    </div>
</template>

<script>

import navBar from "./components/nav-bar"
import errorMessage from "./components/error-message"

export default {
    name: 'app',
    components: { 
        navBar,
        errorMessage
    }
}
</script>

<style scope lang="scss">
    
    html, body, .main_container {
        height: 100%;
    }

    .er-message {
        right: 3%;
        top: 10%;
    }
</style>
