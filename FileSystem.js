import { ShakeFile } from "./ShakeFile";
class FileSystem {
    constructor (options = {}) {
        this.fileHandler = {}
        this.file = {}
        this.options = options
        this.dirHandle = {}
    }

    async getFile () {
        const [fileHandle] = await window.showOpenFilePicker(this.options);
        this.fileHandler = fileHandle;
        this.file = await this.fileHandler.getFile();
        return this.file;
    }

    async  getDir() {
        this.dirHandle = await window.showDirectoryPicker();
        return this.dirHandle;
      }

    
    async getFileContents() {
        this.sfile = new ShakeFile(this.file, this)
        return await this.sfile.data;
    }

    addToDom () {
        return this.sfile.addToDom()
    }
}

export { FileSystem }