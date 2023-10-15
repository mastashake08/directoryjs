class ShakeDecompressionStream extends DecompressionStream {
    constructor(format="gzip") {
        super(format)
    }
}

export {
    ShakeDecompressionStream
}