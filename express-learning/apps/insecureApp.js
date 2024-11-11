const express = require('express')
const app = express()

app.use((req, res) => {
  if (!req.secure)
    res.redirect('https://' + req.hostname + ':3333' + req.url)
})

module.exports = app