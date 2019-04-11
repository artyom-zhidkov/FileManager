<template>
    <div>
        <upload :chunkSize="10240000"
                :validFileType="['txt', 'jpg', 'png', 'pdf', '7z', 'mp4']" 
                :validFileCount="3" 
                :validFileSize="100000000"
        ></upload>

        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>
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
        <b-button variant="info" @click="download" :hidden="!selectedItem">Download</b-button>
        <b-button variant="danger" @click="deleteFile" :hidden="!selectedItem" class="float-right">Delete</b-button>
    </div>
</template>

<script>
    import upload from "./upload/upload"

    export default {
        name: "list-page",
        components: {upload},
        data: () => {
            return {
                selected: [],
                selectAll: false
            }
        },
        methods: {
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let i in this.files) {
                        this.selected.push(this.files[i].fileId);
                    }
                }
            },

            download() {
                this.$store.dispatch('listStore/download', this.selected.join(","));
            },

            deleteFile() {
                this.$store.dispatch('listStore/deleteFiles', this.selected.join(","))
            }
        },
        computed: {
            files() {
                return this.$store.state.listStore.files;
            },
            selectedItem() {
                return Boolean(this.selected.length)
            }
        },
        created() {
            // if (!this.$cookies.isKey("keyName")) {
            //      this.$router.push({ path: 'home' });
            //      return;
            // }
            this.$store.dispatch("listStore/getList")
        }
    }
</script>

<style scoped>
</style>