<template>
    <div class="main-window d-flex align-self-stretch flex-column">
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
</template>

<script>

import navBar from "./components/nav-bar"

export default {
    name: 'app',
    components: { 
        navBar 
    }
}
</script>

<style lang="scss">
    html, body, .main-window {
        height: 100%;
    }
    // }
</style>
