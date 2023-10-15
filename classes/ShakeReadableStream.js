/**
 * @class ShakeReadableStrea
 */
import { FileReadEvent } from "../events/FileReadEvent";
class ShakeReadableStream extends ReadableStream {
    constructor() {
        const underlyingSource = {
            start(controller) {
             super.start(controller)
             new FileReadEvent(true,controller, true);
            },
            pull(controller) {
              // We don't really need a pull in this example
            },
            cancel() {
              
            },
          };
        const queuingStrategy = {};
        super(underlyingSource, queuingStrategy);
    }
}

export {
    ShakeReadableStream
}