class ShakeFile {
    constructor () {
        this.file = null
        this.obj = null
        this.mainDiv = document.createElement('div')
        this.mainDiv.id = 'main-div'

        document.body.appendChild(this.mainDiv)
    }
    getFilenameAndExtension(pathfilename){

        var filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
        var filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
        var ext = filenameextension.split('.').pop();
        
        return [filename, ext];
      
    }

    async saveFile() {
        try {
            const [filename] = this.getFilenameAndExtension(this.file.name);

            // create a new handle
           const newHandle = await window.showSaveFilePicker({
            suggestedName: Date.now() + '-' + filename + '.txt'
           });
         
           // create a FileSystemWritableFileStream to write to
           const writableStream = await newHandle.createWritable();
         
           // write our file
           let my_uint8_array = Uint8Array.from(this.obj.value, c => c.charCodeAt(0)); 
           await writableStream.write(new Blob([my_uint8_array], {type: 'text/plain'}));
         
           // close the file and write the contents to disk.
           await writableStream.close();
           alert('File SAVED!')
           return true   
           } catch (error) {
               alert(error.message)
               return false
           }
    }
    async saveBinaryFile() {
        try {
            const [filename, ext] = this.getFilenameAndExtension(this.file.name);
            // create a new handle
           const newHandle = await window.showSaveFilePicker({
            suggestedName: Date.now() + filename + '.' + ext
           });
         
           // create a FileSystemWritableFileStream to write to
           const writableStream = await newHandle.createWritable();
         
           // write our file
           let my_uint8_array = Uint8Array.from(this.obj.value, c => c.charCodeAt(0)); 
           await writableStream.write(new Blob([my_uint8_array]), {type: this.file.kind});
         
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
        this.data = contents
        return contents
    }
    async setFile(file) {
        this.file = file
    }
    setProgress(reader) {
        const progress = document.createElement('progress')
        progress.id = Date.now().toString()
        const label = document.createElement('label')
        label.innerText = 'Progress:'
        label.setAttribute('for', progress.id) 
        label.appendChild(progress)
        this.mainDiv.appendChild(label)
        progress.appendChild(document.createElement('br'))
        reader.onprogress = (evt) => {
            progress.max = evt.total
            progress.value = evt.loaded
        }
        reader.onloadend = () => {
            this.fadeOut(label)
        }
    }

    addToDom () {
        
        this.mainDiv.innerHTML = ""
        this.mainDiv.style.resize = 'horizontal'
        this.mainDiv.style.overflow = 'auto'
        this.mainDiv.style.height = '100%'
        this.mainDiv.style.width = '100%'
        const reader = new FileReader()
        const file = this.file
        if(file.type.indexOf('audio') > -1) {
            this.setAudio(file, reader)
        } else if(file.type.indexOf('video') > -1) {
            this.setVideo(file, reader)
        } else if(file.type.indexOf('text/plain') > -1) {
            this.setText(file, reader)
        } else {
            this.setObject(file, reader)            
        }
        const div = document.createElement('div')
        div.className = 'actions'
        if(file.type.indexOf('text') < 0) {
            const displayText = document.createElement('button')
            displayText.innerText = 'Display File As Text'
            displayText.onclick = () => {
                this.setText(file, reader)
            }
        displayText.after(document.createElement('br'))
        div.appendChild(displayText)
        }
        
        const displayBinary = document.createElement('button')
        displayBinary.innerText = 'Display File As Binary'
        displayBinary.onclick = () => {
            this.setBinary(file, reader)
        }
        displayBinary.after(document.createElement('br'))
        div.appendChild(displayBinary)
        this.mainDiv.appendChild(div)
        
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
                        remotePlay.style.display = 'none'
                        try {
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
                     
                        remotePlay.style.display = 'none'
                        try {
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
        this.setProgress(reader)
        reader.onload = () => {
                        const dataUrl = reader.result
                        this.obj = document.createElement('textarea')
                        this.obj.style.resize = 'both'
                        this.obj.style.width = '100%'
                        this.obj.style.height = '300px'
                        this.obj.value = dataUrl
                        const save = document.createElement('button')
                        save.innerHTML = 'Save File'
                        save.onclick = () => {
                            this.saveBinaryFile()
                        }    
                        this.mainDiv.appendChild(this.obj)

                        this.obj.after(save)
        }
    }

    setBinary(file, reader) {
        reader.readAsBinaryString(file)
        this.setProgress(reader)
        reader.onload = () => {
            const dataUrl = reader.result
            this.obj = document.createElement('textarea')
            this.obj.disabled = false
            this.obj.style.width = '100%'
            this.obj.style.height = '300px'
            this.obj.className = 'editable-binary'
            this.obj.value = dataUrl
            this.mainDiv.appendChild(this.obj)
            const save = document.createElement('button')
                        save.innerHTML = 'Save Binary File'
                        save.onclick = () => {
                            this.saveBinaryFile()
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

    fadeOut(el) {
        var opacity = 1; // Initial opacity
        var interval = setInterval(function() {
           if (opacity > 0) {
              opacity -= 0.1;
              el.style.opacity = opacity;
           } else {
              clearInterval(interval); // Stop the interval when opacity reaches 0
              el.style.display = 'none'; // Hide the element
              el.remove()
           }
        }, 100);
     }
   
}

export { ShakeFile }