<template>
    <div class="component-upload-item">
        <div class="flex_space-between">
            <div>
                <span class="icon-color"><i :class="getIcon(fileWrapper.name)"></i></span>
                <span class="ml-1">{{fileWrapper.name}}</span>
                <i :hidden="!fileWrapper.status.finished" class="fas fa-check ml-3 icon-color"></i>
            </div>
            <div>
                <b-link @click="deleteFile()" :disabled="(fileWrapper.status.inProgress || fileWrapper.status.finished)" >
                    <span :class="(fileWrapper.status.inProgress || fileWrapper.status.finished) ? 'icon-color_grey' : 'icon-color_grey hover'">
                        <i class="fas fa-times"></i>
                    </span>
                </b-link>
            </div>
        </div>
        <div class="progress-bar">
            <b-progress height="10px" :value="fileWrapper.status.progress" variant="info" :animated="!fileWrapper.status.finished" class="mt-2 b-progress" /><p></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upload-item",
        props: {
            fileWrapper: Object
        },
        data: ()=> {
            return {
                icon: {
                    jpg: "fas fa-image",
                    png: "fas fa-file-image",
                    txt: "fas fa-file-alt",
                    pdf: "fas fa-file-pdf"
                }
            }
        },
        methods: {
            getIcon(fileName) {
                return this.icon[fileName.split(".").pop()]
            },

            deleteFile() {
                if (!this.fileWrapper.status.inProgress || !this.fileWrapper.status.finished) {
                    this.$emit("deleteFile", this.fileWrapper.fileId);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    $background-color: #f1f3f4;
    $border-color: rgb(236, 236, 236);
    $icon-color: #17a2b8;

    .component-upload-item{
        padding: 3px 10px 0;
        margin-bottom: 10px;
        background: $background-color;
        text-align: left;
        font-weight: 200;
        border: solid 1px $border-color;
        border-radius: 2px;

        .flex_space-between {
            display: flex;
            justify-content: space-between;

            .icon-color {
                color: $icon-color;
            }

            .icon-color_grey {
                color: #ccc;
            }

            .hover:hover {
                cursor: pointer;
                color: $icon-color;
            }
        }

        .progress-bar {
            background: inherit;

            .b-progress {
                background: white;
                border: solid 1px $border-color;

                p {
                    margin-bottom: 0;

                }
            }
        }

    }   
</style>

