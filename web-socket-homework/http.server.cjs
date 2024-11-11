const express = require('express'),
  multer = require('multer'),
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  upload = multer({ storage }),
  path = require('path'),
  app = express(),
  PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file)
    return res.status(400).send('No file uploaded.')

  res.status(200).send('File uploaded successfully.')
})

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename,
    filePath = path.join(__dirname, 'uploads', filename)

  res.download(filePath, err => {
    if (err)
      res.status(404).send('File not found.')
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

