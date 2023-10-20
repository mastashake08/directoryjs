class Constants {
    static DEFAULT_QUEUING_STRATEGY  =  {
        highWaterMark: 3,
        size: () => 1,
    };
    static DEFAULT_UNDERLYING_SOURCE = {
        start(controller) {
            return pump();
            function pump() {
                return this.reader.read().then(({ done, value }) => {
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
}

export {
    Constants
}