<template>
    <div class="listFiles_app">
        <header>
            <nav-bar></nav-bar>
        </header>
        <main class="listFiles__main">
            <router-view></router-view>
        </main>
        <!--<footer class="listFiles__footer">-->
            <!--<div class="footer-copyright text-center py-3">© 2019 Copyright</div>-->
        <!--</footer>-->
    </div>
</template>

<script>

import NavBar from "./components/NavBar"

export default {
    name: 'app',
    components: { 
        NavBar 
    }
}
</script>

<style lang="scss">

$color-footer: #17a2b8;

.listFiles__footer {
    background: $color-footer;
    color: white;
    width: 100%;
    position: fixed;
    bottom: 0;
}

.listFiles__main {
    padding: 15px;
}
</style>
