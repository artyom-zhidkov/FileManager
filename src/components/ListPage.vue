<template>
    <div>
        <upload :chunkSize="100" mode="async" :validFileType="['txt', 'jpg', 'png', 'pdf', '7z', 'mp4']" :validFileCount="3" :validFileSize="10000000000000000000"></upload>

        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>
                <!--<b-form-checkbox id="checkbox1" name="checkbox1" v-model="selectAll" @click="select">&ndash;&gt;-->
                <!--</b-form-checkbox>-->
                    <label class="form-checkbox">
                        <input type="checkbox" v-model="selectAll" @click="select">
                    </label>
                </th>
                <th>id</th>
                <th>name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-bind:key="i.id" v-for="i in files">
                <td>
                    <label class="form-checkbox">
                        <input type="checkbox" :value="i.fileId" v-model="selected">
                        <i class="form-icon"></i>
                    </label>
                </td>
                <td><a :href="`#/list/${i.fileId}`">{{i.fileId}}</a></td>
                <td>{{i.fileName}}</td>
            </tr>
            </tbody>
        </table>
        <!-- <div class="text-uppercase text-bold">id selected: {{selected.join(", ")}}</div> -->
        <b-button variant="info" @click="download" :hidden="!selectedItem">Download</b-button>
    </div>
</template>

<script>
    import Upload from "./upload/Upload"

    export default {
        name: "ListPage",
        components: {Upload},
        data: () => {
            return {
                files: [],
                selected: [],
                selectAll: false
            }
        },
        methods: {
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let i in this.files) {
                        this.selected.push(this.files[i].id);
                    }
                }
            },
            download() {
                const query = `http://${this.SERVER}/api/FileManager/DownoaloadFile?ids=${this.selected.join(",")}`;
                fetch(query)
                    .then(
                        (response) => {
                            return response;
                        },
                        (error) => {
                            window.console.error("Rejected: " + error);
                        }
                    )
                    .then(() => {
                        let link = document.createElement("a");
                        link.href = query;
                        link.click();
                    });
            }
        },
        computed: {
            SERVER() {
                return this.$store.getters.SERVER
            },
            selectedItem() {
                return Boolean(this.selected.length)
            }
        },
        created() {
            // if (!this.$cookies.isKey("keyName")) {
            //      this.$router.push({ path: 'home' });
            //      return;
            //}//
            fetch(`http://${this.SERVER}/api/Component`, {})
                .then(
                    (response) => {
                        return response.json();
                    },
                    (error) => {
                        window.console.error("Rejected: " + error);
                    }
                )
                .then((res) => {
                this.files = res;
             });
        }
    }
</script>

<style scoped lang="sass">
</style>