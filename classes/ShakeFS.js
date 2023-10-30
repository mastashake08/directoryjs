import { ShakeFile } from "./ShakeFile";
class ShakeFS {
    
    /**
     * 
     * @param {*} options 
     */
    constructor ({
        fileHandler = null,
        file = null
    }) {
        this.fileHandler = fileHandler
        this.file = file
        this.dirHandle = {}
        this.sfile = new ShakeFile({
            file: this.file
        })
    }
    /**
     * 
     * @returns {ShakeFS} ShakeFS - a new instance of File System
     */
    
    async getFile ({
        options = {}
    }) {

        const [fileHandle] = await window.showOpenFilePicker(options);
        this.fileHandler = fileHandle;
        this.file = await this.fileHandler.getFile();
        this.setFile()
        return this.file;
    }

    async  getDir() {
        this.dirHandle = await window.showDirectoryPicker();
        return this.dirHandle;
      }

    
    async getFileContents() {
        return await this.sfile.getData();
    }

    setFile() {
        return this.sfile.setFile(this.file)
    }

    addToDom () {
        return this.sfile.addToDom()
    }
}

export { ShakeFS  }