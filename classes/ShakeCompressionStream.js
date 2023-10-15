import { ShakeReadableStream } from "./ShakeReadableStream";
import { ShakeWriteableStream } from "./ShakeWriteableStream";

class ShakeCompressionStream extends CompressionStream {
    
    constructor(format="gzip") {
        super(format);
        this.readable = new ShakeReadableStream();
        this.writable = new ShakeWriteableStream();
    }
}

export {
    ShakeCompressionStream
}