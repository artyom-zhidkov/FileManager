<template>
        <div>
            <b-jumbotron header="Get started with FileManager" lead="Sign in to FileManager or Create an account.">
                <p>For more information visit website</p>
                <b-button variant="info" href="#">More Info</b-button>
            </b-jumbotron>
        </div>
</template>

<script>
    export default {
        name: "HomePage",
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                dangerShow: false,
                dangerMessage: "No access"
            }
        },
        created() {
            if (this.$cookies.isKey("keyName")) {
                this.$router.push({ path: 'list' });
            }
        }
    }
</script>

<style scoped>

</style>
