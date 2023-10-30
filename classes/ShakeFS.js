import { ShakeFile } from "./ShakeFile";
class ShakeFS {
    /**
     * 
     * @param {*} options 
     */
    constructor (options = {}) {
        this.fileHandler = {}
        this.file = {}
        this.options = options
        this.dirHandle = {}
        this.sfile = new ShakeFile(this.file)
    }
    /**
     * 
     * @returns {ShakeFS} ShakeFS - a new instance of File System
     */
    
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
        this.sfile.setFile(this.file)
        return await this.sfile.getData();
    }

    addToDom () {
        return this.sfile.addToDom()
    }
}

export { ShakeFS  }