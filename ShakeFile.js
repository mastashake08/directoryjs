class ShakeFile {
    constructor (file) {
        this.file = file
        this.data = this.getData()
        this.obj = null
        this.mainDiv = {}
    }
    async saveFile() {
        try {
            // create a new handle
           const newHandle = await window.showSaveFilePicker({
            suggestedName: Date.now() + this.file.name 
           });
         
           // create a FileSystemWritableFileStream to write to
           const writableStream = await newHandle.createWritable();
         
           // write our file
           console.log(this.obj)
           await writableStream.write(new Blob([this.obj.value]));
         
           // close the file and write the contents to disk.
           await writableStream.close();
           return true   
           } catch (error) {
               alert(error.message)
               return false
           }
    }
    async saveBinaryFile() {
        try {
            // create a new handle
           const newHandle = await window.showSaveFilePicker({
            suggestedName: Date.now() + this.file.name 
           });
         
           // create a FileSystemWritableFileStream to write to
           const writableStream = await newHandle.createWritable();
         
           // write our file
           console.log(this.obj)
           await writableStream.write(new Blob(this.obj.value));
         
           // close the file and write the contents to disk.
           await writableStream.close();
           return true   
           } catch (error) {
               alert(error.message)
               return false
           }
    }
    async getData () {
        const buffer = await this.file.arrayBuffer()
        console.log(buffer)
        const contents = {
            name: this.file.name,
            kind: this.file.kind,
            text: await this.file.text(),
            stream: await this.file.stream(),
            arrayBuffer: buffer,
            dataView: new DataView(buffer),
            int8Array: new Int8Array(buffer),
            uint8Array: new Uint8Array(buffer),
            size: this.file.size,
            lastModified: this.file.lastModified,
            lastModifiedDate: this.file.lastModifiedDate,
            type: this.file.type,
            domEl: this.addToDom()


        }
        return contents
    }

    addToDom () {
        this.mainDiv = document.createElement('div')
        this.mainDiv.style.resize = 'horizontal'
        this.mainDiv.style.overflow = 'auto'
        this.mainDiv.style.height = '100%'
        this.mainDiv.style.width = '50%'
        const reader = new FileReader()
        const file = this.file
        if(file.type.indexOf('audio') > -1) {
            this.setAudio(file, reader)
        } else if(file.type.indexOf('video') > -1) {
            this.setVideo(file, reader)
        } else if(file.type.indexOf('text') > -1) {
            this.setText(file, reader)
        } else {
            this.setObject(file, reader)            
        }
        const hr = document.createElement('hr')
        const div = document.createElement('div')
        const displayText = document.createElement('button')
        displayText.innerHTML = 'Display File As Text'
        displayText.onclick = () => {
            this.setText(file, reader)
        }
        const displayBinary = document.createElement('button')
        displayBinary.innerHTML = 'Display File As Binary'
        displayBinary.onclick = () => {
            this.setBinary(file, reader)
        }
        div.appendChild(displayText)
        div.appendChild(displayBinary)
        this.mainDiv.appendChild(hr)
        this.mainDiv.appendChild(div)
        document.body.appendChild(this.mainDiv)
        
    }

    setVideo(file, reader) {
        reader.readAsDataURL(file)
        reader.onload = () =>{
                        const dataUrl = reader.result
                        this.obj = document.createElement('video')
                        this.obj.style.resize = 'both'
                        this.obj.setAttribute("controls","controls") 
                        this.obj.setAttribute("x-webkit-airplay","allow")
                        this.obj.setAttribute("cast","allow")
                        this.obj.disableRemotePlayback = false
                        this.obj.style.width = '250px'
                        this.obj.style.height = '250px'
                        this.obj.style.marginBottom = '5px'
                        this.obj.src = dataUrl
                        this.mainDiv.appendChild(this.obj)
                        const remotePlay = document.createElement('button')
                        console.log(chrome)
                        remotePlay.style.display = 'none'
                        try {
                            console.log(chrome.cast.isAvailable())
                            cast.framework.CastContext.getInstance().setOptions({
                                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                            });
                            remotePlay.style.display = 'inline'
                        } catch {
                            remotePlay.style.display = 'none'
                        }
                        remotePlay.onclick = function(){
                            this.obj.remote.prompt()
                            return false;
                          };
                        
                        remotePlay.innerHTML = 'Remote Play'
                        this.obj.after(remotePlay)
        }
    }

    setAudio(file, reader) {
        reader.readAsDataURL(file)
        reader.onload = () => {
                        const dataUrl = reader.result
                        this.obj = document.createElement('audio')
                        this.obj.style.resize = 'both'
                        this.obj.setAttribute("controls","controls") 
                        this.obj.setAttribute("x-webkit-airplay","allow")
                        this.obj.setAttribute("cast","allow")
                        this.obj.disableRemotePlayback = false
                        this.obj.style.width = '250px'
                        this.obj.style.height = '250px'
                        this.obj.src = dataUrl
                        this.mainDiv.appendChild(this.obj)
                        const remotePlay = document.createElement('button')
                        console.log(chrome)
                        remotePlay.style.display = 'none'
                        try {
                            console.log(chrome.cast.isAvailable())
                            cast.framework.CastContext.getInstance().setOptions({
                                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                            });
                            remotePlay.style.display = 'inline'
                        } catch {
                            remotePlay.style.display = 'none'
                        }
                        remotePlay.onclick = function(){
                            this.obj.remote.prompt()
                            return false;
                          };
                        
                        remotePlay.innerHTML = 'Remote Play'
                        this.obj.after(remotePlay)
        }
    }
    setText(file, reader) {
        reader.readAsText(file)
        reader.onload = () => {
                        const dataUrl = reader.result
                        this.obj = document.createElement('textarea')
                        this.obj.style.resize = 'both'
                        this.obj.style.width = '100%'
                        this.obj.style.height = '300px'
                        this.obj.value = dataUrl
                        const save = document.createElement('button')
                        save.innerHTML = 'Save File'
                        console.log('save')
                        save.onclick = () => {
                            this.saveBinaryFile()
                        }    
                        this.mainDiv.appendChild(this.obj)

                        this.obj.after(save)
        }
    }

    setBinary(file, reader) {
        reader.readAsBinaryString(file)
        reader.onload = () => {
            const dataUrl = reader.result
            this.obj = document.createElement('textarea')
            this.obj.disabled = false
            this.obj.style.resize = 'both'
            this.obj.style.width = '100%'
            this.obj.style.height = '300px'
            this.obj.value = dataUrl
            this.mainDiv.appendChild(this.obj)
            const save = document.createElement('button')
                        save.innerHTML = 'Save File'
                        console.log('save')
                        save.onclick = () => {
                            this.saveFile()
                        }
            this.obj.after(save)  
        }
    }

    setObject(file, reader) {
        reader.readAsDataURL(file)
        reader.onload = async() => {
                        const dataUrl = reader.result
                        this.obj = document.createElement('object')
                        
                        this.obj.style.width = 'auto'
                        this.obj.style.height = 'auto'
                        this.obj.data = dataUrl   //DataURL
                        this.obj.type = file.type
                        this.mainDiv.appendChild(this.obj)
                        
        }
    }
   
}

export { ShakeFile }