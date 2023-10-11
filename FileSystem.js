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

    async  saveFile(data) {
        try {
         // create a new handle
        const newHandle = await window.showSaveFilePicker();
      
        // create a FileSystemWritableFileStream to write to
        const writableStream = await newHandle.createWritable();
      
        // write our file
        await writableStream.write(data);
      
        // close the file and write the contents to disk.
        await writableStream.close();
        return true   
        } catch (error) {
            alert(error.message)
            return false
        }
    }
}

export { FileSystem }