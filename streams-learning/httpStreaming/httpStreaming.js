const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const { promises, createReadStream } = require('fs')

app.get('/video', async(req, res) => {
  console.log('/video')

  const range = req.headers.range

  if (!range) {
    res.status(400).send('invalid request')
    return
  }

  const videoPath = '../video.mp4'
  const videoSize = (await promises.stat(videoPath)).size
  // 1024 byte -> 1 KB
  // 1024KB -> 1 MB
  // 1024 byte * 1024 byte -> 1 MB
  const chunkSize = 1024 * 1024
  // parse range
  // example: bytes=32324-
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + chunkSize, videoSize - 1)
  const contentLength = end - start + 1

  res.writeHead(206, {
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Range': `bytes ${start}-${end}/${videoSize}`
  })

  createReadStream(videoPath, { start, end }).pipe(res)
})

app.listen(3000, () => console.log('listening'))