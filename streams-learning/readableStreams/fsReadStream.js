const { createReadStream } = require('fs')
const readStream = createReadStream('../video.mp4')

readStream.on('data', chunk => {
  console.log('length: ', chunk.length, 'chunk: ', chunk)
  // console.log('size:', chunk.length)
})

readStream.on('error', error => {
  console.log('error: ', error)
})

readStream.on('end', () => {
  console.log('end')
})

readStream.pause()

process.stdin.on('data', chunk => {
  // console.log('chunk: ', chunk)

  const input = chunk.toString().trim()
  if (input === 'finish') readStream.resume()
  else if (input === 'read') readStream.read()
})