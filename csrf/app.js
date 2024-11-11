const express = require('express')
const app = express()

const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'jade')
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(logger('dev'))
  .use(cookieParser())
  .use('/', require('./routes/index'))
  .use('/form', require('./routes/form'))
  .use((req, res, next) => {next(createError(404))})
  .use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

module.exports = app