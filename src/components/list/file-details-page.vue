<template>
    <div>
        <p>{{file}}</p>
        <b-table striped hover :items="file"></b-table>
        <router-link to="/list">
            <b-button variant="info">back</b-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "file-details-page",
        computed: {
            file() {
                return this.$store.getters.getFileDetails
            }
        },
        created() {
            const {id} = this.$route.params;
            this.$store.dispatch('fileDetailsStore/getFile', id);
        }
    }
</script>

<style scoped>

</style>