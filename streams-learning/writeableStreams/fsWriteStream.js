const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('../video.mp4')
const writeStream = createWriteStream('../copy.mp4', {
  // if you do not specify this, it will adjust it automatically for memory efficiency
  highWaterMark: 65536
})

readStream.on('data', chunk => {
  console.log('read stream- length: ', chunk.length, 'chunk: ', chunk)

  // if it is false, that means the hose is full, so it cannot accept more data
  // if you do not check this, then you have 'backpressure'
  // if it is full, it should stop, this prevents using memory too much
  const result = writeStream.write(chunk)
  if (!result) {
    console.log('BACKPRESSURE')
    readStream.pause()
  }

})

// the hose is empty now
writeStream.on('drain', () => {
  console.log('drain')
  readStream.resume()
})

readStream.on('error', error => {
  console.log('read stream- error: ', error)
})

readStream.on('end', () => {
  console.log('read stream- end')
  writeStream.end()
})

writeStream.on('close', () => {
  console.log('write stream- close')
  // process.stdout.write('write stream- close \n')
})
