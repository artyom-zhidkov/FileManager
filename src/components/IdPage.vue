<template>
    <div>
        <b-table striped hover :items="files"></b-table>
        <router-link to="/list">
            <b-button variant="info">back</b-button>
        </router-link>


    </div>
</template>

<script>

    export default {
        name: "IdPage",
        data: () => {
            return {
                files: []
            }
        },
        computed: {
            SERVER() {
                return this.$store.getters.SERVER
            },

        },
        created() {
            const {id} = this.$route.params;
            window.console.log(this.$router);
            fetch(`http://${this.SERVER}/api/Component/${id}`)
                .then(
                    (response) => {
                        return response.json();
                    },
                    (error) => {
                        console.error("Rejected: " + error);
                    }
                )
                .then((res) => {
                    this.files.push(res);
            });
        }
    }
</script>

<style scoped>

</style>