
export default class FileWrapper {
    constructor(file, chunkSize) {
        this.file = file;
        this.name = file.name;
        this.sumChunk = Math.ceil(file.size / chunkSize);
        this.currentChunk = -1;
        this.fileId = (hashCode(((new Date()).getTime()).toString())*-1).toString();
        this.chunks = [];
        this.status = {
            finished: false,
            inProgress: false,
            progress: 0
        }

        function hashCode(s) {
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        }                   
        for (let j = 0; j < this.sumChunk; j++) {
            this.chunks[j] = file.slice(j * chunkSize, j * chunkSize + chunkSize);
        }
    }

    readCurrentChunk() {
        if (this.status.finished) return;
        return new Promise((resolve) => {
            const reader = new FileReader();
            this.currentChunk++;
            this.inProgress = true;
            this.status.progress += (100 / this.sumChunk);
            if ((this.currentChunk + 1) === (this.sumChunk)) {
                this.status.finished = true;
                this.inProgress = false;
            }             
            reader.onload = () => {
                let base64data = reader.result;                
                resolve(base64data.split(",").pop());
            };
            reader.readAsDataURL(this.chunks[this.currentChunk]);
        })
    }
}