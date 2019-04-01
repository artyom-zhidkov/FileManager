<template>
        <div>
            <b-jumbotron header="Get started with FileManager" lead="Sign in to FileManager or Create an account.">
                <p>For more information visit GitHub</p>
                <b-button variant="info" target="_blank" href="https://github.com/artyom-zhidkov/FileManager">Go to GitHub</b-button>
            </b-jumbotron>
        </div>
</template>

<script>
    export default {
        name: "home-page",
        created() {
            if (this.$cookies.isKey("keyName")) {
                this.$router.push({ path: 'list' });
            }
        }
    }
</script>

<style scoped>

</style>
