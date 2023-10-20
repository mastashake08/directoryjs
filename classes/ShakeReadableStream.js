/**
 * @class ShakeReadableStream
 */
import { FileReadEvent } from "../events/FileReadEvent";
class ShakeReadableStream extends ReadableStream {
    underlyingSource = {
        start(controller) {
            return pump();
            function pump() {
                return this.getReader().read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream

                  this.dispatchEvent(new FileReadEvent(true,{ data: value }, true));
                  controller.enqueue(value);
                  return pump();
                });
              }
        },
        pull(controller) {
          // We don't really need a pull in this example
        },
        cancel() {
          controller.cancel()
        },
    };
    queuingStrategy =  {
        highWaterMark: 3,
        size: () => 1,
    };

    /**
     * 
     * @param {*} underlyingSource - The underlying source object for the readable stream
     * @param {*} queuingStrategy - The queuing strategy for the readable stream
     */
    constructor(underlyingSource = this.underlyingSource, queuingStrategy = this.queuingStrategy) {
        super(underlyingSource, queuingStrategy);
    }

    
}

export {
    ShakeReadableStream
}