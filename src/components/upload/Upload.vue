<template>
    <div class="pb-2">
        <div :class="dropDestination ? 'drop-area activ' : 'drop-area'"
            @dragenter="handleDragenterOver"
            @dragover.prevent="handleDragenterOver"
            @dragleave="handleDragleave"
            @drop.prevent="handleDrop">
            <div class="dashed text-center">
                <form class="my-form mb-0">
                    <i class="fas fa-cloud-upload-alt fa-3x"></i>
                    <p class="font-weight-bold pt-2">Drag&Drop files here or</p>
                    <label class="button-browse-files" for="fileElem">Browse files</label>
                    <input type="file" id="fileElem" class="d-none" ref="myFiles" multiple
                           @change="handleButtonBrows">
                    <div class="d-flex justify-content-center text-left p-3">
                        <div class="p-2 align-baseline" v-if="isShow.alertErrorFiles">
                            <span class="font-weight-bold">Error files:</span>
                            <div v-for="(fileName, key) in errorFiles" :key="key">
                                <i class="fas fa-times text-danger"></i>
                                <span class="pl-2">{{fileName}}</span>
                            </div>
                        </div>
                        <div class="p-2 align-baseline" v-if="isShow.alertErrorFiles">
                            <span class="font-weight-bold">Restrictions:</span>
                            <div v-show="isShow.restrict.count">
                                <i class="fas fa-exclamation-circle text-info"></i>
                                <span class="pl-2">count files limit: {{validFileCount}}</span>
                            </div>
                            <div v-show="isShow.restrict.type">
                                <i class="fas fa-exclamation-circle text-info"></i>
                                <span class="pl-2">forbidden file types:</span>
                                <span v-for="(type, key) in errorFileType" :key="key">
                                    <span class="pl-2">{{type}}</span>
                                </span>
                            </div>
                            <div v-show="isShow.restrict.size">
                                <i class="fas fa-exclamation-circle text-info"></i>
                                <span class="pl-2">size files limit: {{validFileSize}}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-for="(fileWrapper, key) in wrapperFiles" :key="key">
            <upload-item @deleteFile="deleteFile" :fileWrapper="fileWrapper"></upload-item>
        </div>
        <div class="d-flex justify-content-center">
            <b-button class="ml-2" @click="handleUpload" :hidden="!isShow.buttonUpload" variant="info">Upload</b-button>
            <b-button class="ml-2" @click="handleCancel" :hidden="!isShow.buttonCancel" variant="info">Cancel</b-button>
            <b-button class="ml-2" @click="reset" :hidden="!isShow.buttonClear" variant="outline-danger">Clear Uploaded</b-button>
        </div>            
    </div>
    

</template>

<script>

    import FileWrapper from "../../models/file-wrapper"
    import uploadItem from "./upload-item"

    export default {
        name: "upload",
        components: {uploadItem},
        props: {
                chunkSize: Number,
                mode: String,
                validFileType: Array,
                validFileCount: Number,
                validFileSize: Number
                },
        data: () => {
            return {
                files: [],
                wrapperFiles: [],
                amountWrapperFiles: 0,
                errorFiles: new Set(),
                errorFileType: new Set(),
                dropDestination: false,
                pop: false,
                isShow: {
                    restrict: {
                        count: false,
                        type: false,
                        size: false
                    },
                    buttonUpload: false,
                    buttonCancel: false,
                    buttonClear: false,
                    alertErrorFiles: false
                },
            }
        },
        computed: {
            selected() {
                return Boolean(this.wrapperFiles.length)
            },
            validFileTypeSet() {
                return new Set(this.validFileType)
            }
        },
        methods: {
            reset() {
                this.wrapperFiles = [];
                this.errorFiles.clear();
                this.errorFileType.clear();
                this.isShow.buttonUpload = false;
                this.isShow.buttonCancel = false;
                this.isShow.buttonClear = false;
                this.isShow.alertErrorFiles = false;
                for (let state in this.isShow.restrict) state = false;
            },
            
            handleButtonBrows() {
                this.files = this.$refs.myFiles.files;
                this.createUploadWrapperFiles();
            },
            
            handleDragenterOver() {
                this.dropDestination = true;
            },
            
            handleDragleave() {
                this.dropDestination = false;
            },
            
            handleCancel() {

                this.isShow.buttonCancel = false;
            },
            
            handleDrop(e) {
                this.files = e.dataTransfer.files;
                this.createUploadWrapperFiles();
            },
            
            createUploadWrapperFiles() {
                this.dropDestination = false;
                this.isShow.buttonCancel = false;

                for (let i = 0; i < this.files.length; i++) {
                    const extension = this.files[i].name.split(".").pop();

                    if (this.wrapperFiles.some((file) => {
                        return (file.name === this.files[i].name);
                    })) {
                        continue;
                    }

                    if (!this.validFileTypeSet.has(extension)) {
                        this.errorFileType.add(extension);
                        this.errorFiles.add(this.files[i].name);
                        this.isShow.alertErrorFiles = true;
                        this.isShow.restrict.type = true;
                        this.isShow.buttonClear = true;
                    }
                    if (this.files[i].size > this.validFileSize) {
                        this.errorFiles.add(this.files[i].name);
                        this.isShow.alertErrorFiles = true;
                        this.isShow.restrict.size = true;
                        this.isShow.buttonClear = true;
                    }
                    // && (this.wrapperFiles.length === this.validFileCount))
                    if (((this.files.length + this.wrapperFiles.length) > this.validFileCount)) {
                        this.isShow.alertErrorFiles = true;
                        this.isShow.restrict.count = true;
                        this.isShow.buttonClear = true;
                        this.errorFiles.add(this.files[i].name);
                    }
                    if (!this.errorFiles.has(this.files[i].name)) {
                        if (this.wrapperFiles.length < 3) {
                            this.wrapperFiles.push(new FileWrapper(this.files[i], this.chunkSize));
                            this.isShow.buttonUpload = true;
                            this.isShow.buttonClear = true;
                        } else {
                            this.isShow.restrict.count = false;
                            this.errorFiles.add(this.files[i].name);
                        }
                    }
                }
            },

            deleteFile(fileId) {
                this.wrapperFiles.forEach((file, i) => {
                    if (file.fileId === fileId) {
                        this.wrapperFiles.splice(i, 1);
                    }
                })
            },

            handleUpload() {
                const self = this;
                this.isShow.buttonUpload = false;
                this.isShow.buttonCancel = true;
                this.isShow.buttonClear = false;

                async function upload(fileWrapper) {
                    if (!fileWrapper.status.finished) {
                        const chunk = await fileWrapper.readCurrentChunk();
                        const body = {
                            fileId: fileWrapper.fileId,
                            fileName: fileWrapper.name,
                            n: fileWrapper.currentChunk,
                            totalCounts: fileWrapper.sumChunk,
                            chunksData: chunk
                        }
                        if (!self.isShow.buttonCancel) {
                            self.reset();
                            this.isShow.buttonClear = false;
                        } else {
                         await self.$store.dispatch('uploadStore/uploadChunks', body);
                         await upload(fileWrapper);
                        }
                    }
                }

                let i = 0;
                (async function start(wrapperFiles) {
                    if (i < wrapperFiles.length) {
                        await upload(wrapperFiles[i++]);
                        start(wrapperFiles);
                    } else {
                        self.isShow.buttonCancel = false;
                        self.isShow.buttonClear = true;
                        self.$store.dispatch("listStore/getList");
                        return Promise.resolve();
                    }
                })(this.wrapperFiles);
            }
        }
    }
 </script>



<style lang="scss" scoped>

    $background-color: #f1f3f4;
    $border-color: rgb(236, 236, 236);
    $main-color: #17a2b8;

    .drop-area {
        background-color: $background-color;
        margin-bottom: 20px;
        border-radius: 3px;
        padding: 10px;
        color: grey;

        .dashed {
            border: 2px dashed #ccc;
            border-radius: 3px;
            padding: 20px;
            pointer-events: none;
        }

        .button-browse-files {
            display: inline-block;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            border: 1px solid $main-color;
            color: $main-color;
            margin-bottom: 0;
            pointer-events: auto;
        }

        .button-browse-files:hover {
            background: #17a2b8;
            color: white;
        }
    }

    .activ {
        .dashed {
            border: 2px dashed #6d8ccc;
            background-color: #aee6f4;
        }
    }
</style>        