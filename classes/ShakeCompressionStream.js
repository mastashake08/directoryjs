class ShakeCompressionStream extends CompressionStream {
    constructor(format="gzip") {
        super(format)
    }
}

export {
    ShakeCompressionStream
}