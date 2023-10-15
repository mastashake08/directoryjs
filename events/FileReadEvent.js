import { ShakeBaseEvent } from "./ShakeBaseEvent";
class FileReadEvent extends ShakeBaseEvent {
    constructor( bubbles = false, data = {}, loggableEvent = false, logEvent = () => { console.table(this)}) { 
        super('file-read', bubbles, data, loggableEvent, logEvent);
    }
    
}

export {
    FileReadEvent
}