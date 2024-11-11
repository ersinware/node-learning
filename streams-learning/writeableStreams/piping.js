// const { createReadStream, createWriteStream } = require('fs')
// const readStream = createReadStream('../video.mp4')
// const writeStream = createWriteStream('../copy.mp4')
//
// // piping automatically handles backpressure
// readStream.pipe(writeStream)
//   .on('close', () => console.log('close'))
//   .on('error', () => console.log('error'))

//

const { createWriteStream } = require('fs')
const writeStream = createWriteStream('../text.txt')

// piping automatically handles backpressure
process.stdin.pipe(writeStream)
  .on('close', () => console.log('close'))
  .on('error', () => console.log('error'))