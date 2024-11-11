const express = require('express')
const app = express()

const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const createError = require('http-errors')

app
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'jade')
  // To use multiple static assets directories, call the express.static middleware function multiple times:
  // app.use(express.static('public'))
  // app.use(express.static('files'))
  // To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function,
  // specify a mount path for the static directory, as shown below:
  // app.use('/static', express.static(path.join(__dirname, 'public')))
  // auth için öncesine bir path (/assets mesela) ve fonksiyon daha ekleyebilirsin
  // hatta, static.js diye bir dosya oluştur ve orada configure edip, middleware fonksiyonu o dosyadan export edip buraya ekle
  .use(express.static(path.join(__dirname, '../public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(logger('dev'))
  .use(cookieParser())
  // https://www.npmjs.com/package/compression
  // For a high-traffic website in production, the best way to put compression in place is to implement it at a
  // reverse proxy level (see Use a reverse proxy). In that case, you do not need to use compression middleware.
  .use(compression())
  // gerçek proje yaparken, http projesini oku ve tüm middleware'leri dikkatle incele:
  // https://www.npmjs.com/package/helmet
  // Includes all 15 middlewares
  .use(helmet())
  .use('/', require('../routes/1-routing'))
  .use('/routePaths', require('../routes/2-routePaths'))
  .use('/routeParameters', require('../routes/3-routeParameters'))
  .use('/routeHandlers', require('../routes/4-routeHandlers'))
  .use('/writingMiddleware', require('../routes/5-writingMiddleware'))
  .use('/usingMiddleware', require('../routes/6-usingMiddleware'))
  .use('/overridingExpress', require('../routes/7-overridingExpress'))
  .use('/errorHandling', require('../routes/8-errorHandling'))
  .use('/securityPractices', require('../routes/9-securityPractices'))
  .use('/performancePractices', require('../routes/10-performancePractices'))
  // catch 404 and forward to error handler
  .use((req, res, next) => {next(createError(404))})
  // error handler
  .use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

module.exports = app