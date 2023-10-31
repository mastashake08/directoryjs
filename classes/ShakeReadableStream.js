/**
 * @class ShakeReadableStream
 */
import { Constants } from './utils/Constants'
class ShakeReadableStream extends ReadableStream {
    
    /**
     * 
     * @param {*} underlyingSource - The underlying source object for the readable stream
     * @param {*} queuingStrategy - The queuing strategy for the readable stream
     */
    constructor(underlyingSource = Constants.DEFAULT_UNDERLYING_SOURCE, queuingStrategy = Constants.DEFAULT_QUEUING_STRATEGY) {
        super(underlyingSource, queuingStrategy);
    }

    
}

export {
    ShakeReadableStream
}