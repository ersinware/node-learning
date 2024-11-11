// transform streams are a special type of duplex streams that can transform/change the data before sending it to write stream

const { Transform } = require('stream')

class ReplaceTextTransform extends Transform {
  constructor(char) {
    super()
    this.char = char
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/g, this.char)
    this.push(transformedChunk)
    callback()
  }

  _flush(callback) {
    this.push('final push')
    callback()
  }
}

const replaceTextTransform = new ReplaceTextTransform('X')

process.stdin.pipe(replaceTextTransform).pipe(process.stdout)