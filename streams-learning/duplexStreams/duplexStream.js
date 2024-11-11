const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('../video.mp4')
const writeStream = createWriteStream('../copy.mp4')

const { PassThrough, Duplex } = require('stream')
// duplex stream
// used for reasons like seeing something about the data or report
const passThrough = new PassThrough()

let chunkNumber = 0
passThrough.on('data', (chunk) => {
  console.log('chunk number: ', ++chunkNumber)
})

class Throttle extends Duplex {
  constructor(delay) {
    super()
    this.delay = delay
  }

  _read() {

  }

  _write(chunk, encoding, callback) {
    this.push(chunk)
    setTimeout(callback, this.delay)
  }

  _final() {
    this.push(null)
  }
}

const throttle = new Throttle(50)

readStream.pipe(throttle).pipe(passThrough).pipe(writeStream)