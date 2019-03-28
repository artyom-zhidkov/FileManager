<template>
    <div class="storageFiles__upload">

        <div :class="dropDestination ? 'drop-area activ' : 'drop-area'"
            @dragenter="handleDragenterOver"
            @dragover.prevent="handleDragenterOver"
            @dragleave="handleDragleave"
            @drop.prevent="handleDrop">
            <div class="dashed">
                <form class="my-form mb-0">
                    <i class="fas fa-cloud-upload-alt fa-3x"></i>
                    <p >Drag&Drop files here</p>
                    <p>or</p>

                    <label class="upload_button" for="fileElem">Browse files</label>
                    <input type="file" id="fileElem" ref="myFiles" multiple
                           @change="handleButtonBrows">
                    <br>

                    <div class="alert-error-restrictions">
                        <b-alert class="b-alert" :show="isShow.alertErrorFiles" variant="danger">
                            <span>Error files:</span>
                            <div v-for="(fileName, key) in errorFiles" :key="key">
                                <i class="fas fa-times"></i>
                                <span>{{fileName}}</span>
                            </div>
                        </b-alert>
                        <b-alert class="b-alert" :show="isShow.alertErrorFiles" variant="light">
                            <span>Restrictions:</span>
                            <div v-show="isShow.restrict.count">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>count files limit: {{validFileCount}}</span>
                            </div>
                            <div v-show="isShow.restrict.type">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>forbidden file types:</span>
                                <span v-for="(type, key) in errorFileType" :key="key">
                                    <span>{{type}}</span>
                                </span>
                            </div>
                            <div v-show="isShow.restrict.size">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>size files limit: {{validFileSize}}</span>
                            </div>
                        </b-alert>
                    </div>
                </form>
            </div>
        </div>
        <div class="result-upp">
            <div v-for="(fileWrapper, key) in wrapperFiles" :key="key">
                <upload-item @deleteFile="deleteFile" :fileWrapper="fileWrapper"></upload-item>
            </div>
        </div>
        <div class="heigth">
            <b-button @click="handleUpload" :hidden="!isShow.buttonUpload" variant="info">Upload</b-button>
            <b-button @click="handleCancel" :hidden="!isShow.buttonCancel" variant="info">Cancel</b-button>
            <b-link @click="reset" class="link" :hidden="!isShow.buttonClear">Clear Uploaded</b-link>
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
                    }
                    if (this.files[i].size > this.validFileSize) {
                        this.errorFiles.add(this.files[i].name);
                        this.isShow.alertErrorFiles = true;
                        this.isShow.restrict.size = true;
                    }
                    if (((this.files.length + this.wrapperFiles.length) > this.validFileCount) && (this.wrapperFiles.length === this.validFileCount)) {
                        this.isShow.alertErrorFiles = true;
                        this.isShow.restrict.count = true;
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

                        await self.$store.dispatch('uploadStore/uploadChunks', body);
                        await upload(fileWrapper);
                    }
                }

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
                        await self.$store.dispatch('uploadStore/uploadChunks', body);
                        await upload(fileWrapper);
                    }
                }
                 let i = 0
                (async function start(wrapperFiles) {
                    if (i < wrapperFiles.length) {
                        await upload(wrapperFiles[i++]);
                        start(wrapperFiles);
                        
                    } else {
                        self.isShow.buttonCancel = false;
                        self.isShow.buttonClear = true;
                    self.$store.dispatch("listStore/getList")
                        // debugger;
                        return Promise.resolve();
                    }
                })(this.wrapperFiles);




                
            }
        }
    }
 </script>


<style lang="scss" scoped>
    .storageFiles__upload {
        .heigth{
            height: 30px;
            position: relative;
        }

        padding-bottom: 25px;
        text-align: center;

        p {
            margin: 10px;
        }

        span {
            padding-left: 10px;
        }

        form {
            .b-alert {
                background: inherit;
                text-align: left;
                font-weight: 200;
                margin-bottom: 0;
                border: none;
            }
        }
    }
    .drop-area {
                background-color: #f1f3f4;
                margin-bottom: 20px;
                border-radius: 3px;
                padding: 10px;
                color: grey;
                
                   
            }
    .link {
        position: absolute;
        right: 15px;
        bottom: 10px;
        color: grey;
    }
    .back-white {
        background: white;
    }
    .success-alert {
        font-size: small;
        padding: 5px 5px 0 5px;
        margin-bottom: 10px;
        text-align: left;
    }
    .alert-error-restrictions {
        display: flex;
        font-size: small;
        .b-alert {
            padding: 0 10px;
        }     
    }
    .activ {
        .dashed {
            border: 2px dashed #6d8ccc;
            background-color: #aee6f4;
        }
    }

    .dashed {
        border: 2px dashed #ccc;
        border-radius: 3px;
        padding: 20px;
        pointer-events: none;
    }

    .my-form {
        margin-bottom: 10px;
        text-align: center;
        font-weight: bold;
    }

    .upload_button {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #17a2b8;
        color: #17a2b8;
        margin-bottom: 0;
        pointer-events: auto;
    }

    .upload_button:hover {
        background: #17a2b8;
        color: white;
    }

    #fileElem {
        display: none;
    }

</style>

                  // async function uploadWeaper(file) {
                //     // return new Promise(resolve => {
                //         // (async () => {
                //             await upload(file);
                //         // })();
                //         // resolve();
                //     // });
                // }

                // function start(files) {
                //     return new Promise((resolve) => {
                //         // let i = 0;
                //         // while (i < files.length) {
                //         //     uploadWeaper(files[i]);
                //         //     i++;
                //         // }
                //         await uploadWeaper(files[0]);
                //         await uploadWeaper(files[1]);
                //         resolve();
                //     })
                // }

                // start(this.wrapperFiles).then(v => {
                //     self.isShow.buttonCancel = false;
                //     self.isShow.buttonClear = true;
                //     self.$store.dispatch("listStore/getList");
                // });

          