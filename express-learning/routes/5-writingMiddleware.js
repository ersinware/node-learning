const router = require('express').Router()

// app level:
// const myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }
//
// app.use(myLogger)

router.use(async (req, res, next) => {
  req.requestTime = Date.now()
  next()
})

router.get('/getRequestTime', (req, res) => {
  res.send(`${req.requestTime}`)
})

// Configurable middleware
// If you need your middleware to be configurable, export a function which accepts an options object or other parameters,
// which, then returns the middleware implementation based on the input parameters.
//
// File: my-middleware.js
// module.exports = function (options) {
//   return function (req, res, next) {
//     // Implement the middleware function based on the options object
//     next()
//   }
// }
//
// The middleware can now be used as shown below.
//
// const mw = require('./my-middleware.js')
// app.use(mw({ option1: '1', option2: '2' }))

module.exports = router