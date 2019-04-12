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
            <b-progress height="10px" :value="fileWrapper.status.progress" variant="warning" 
                        :animated="!fileWrapper.status.finished" class="mt-2 mb-2 b-progress" />
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
                    pdf: "fas fa-file-pdf",
                    "7z": "fas fa-file-archive"
                }
            }
        },
        methods: {
            getIcon(fileName) {
                const extention = fileName.split(".").pop();
                if (this.icon.hasOwnProperty(extention)) {
                    return this.icon[extention]
                } else {
                    return "far fa-file";
                }
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

    .component-upload-item{
        padding: 3px 10px 0;
        margin-bottom: 10px;
        background: $uploadItemBackground;
        text-align: left;
        font-weight: 200;
        border: solid 1px $uploadItemBorderColor;
        border-radius: 2px;

        .flex_space-between {
            display: flex;
            justify-content: space-between;

            .icon-color {
                color: $uploadItemIconColor;
            }

            .icon-color_grey {
                color: $uploadItemCrossColor;
            }

            .hover:hover {
                cursor: pointer;
                color: $uploadItemIconActiveColor;
            }
        }

        .progress-bar {
            background: inherit;

            .b-progress {
                background: $primaryBackgroundColor;
                border: solid 1px $uploadItemBorderColor;

                p {
                    margin-bottom: 0;
                }
            }
        }
    }   
</style>

