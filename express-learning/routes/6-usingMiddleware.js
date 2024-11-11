const router = require('express').Router()

// ||| app level
//
// app.get('/user/:id', (req, res, next) => {
//   console.log('ID:', req.params.id)
//   next()
// }, (req, res, next) => {
//   // THIS SENDS THE RESPONSE
//   res.send('User Info')
// })
//
// // BURASI ÇALIŞMIYOR MIDDLEWARE'DE RESPONSE DÖNDÜRÜLDÜĞÜ İÇİN
// // handler for the /user/:id path, which prints the user ID
// app.get('/user/:id', (req, res, next) => {
//   res.send(req.params.id)
// })

// |||| next('route')
//
// To skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next route.
// NOTE: next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions.
//
// app.get('/user/:id', (req, res, next) => {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id === '0') next('route')
//   // otherwise pass the control to the next middleware function in this stack
//   else next()
// }, (req, res, next) => {
//   // send a regular response
//   res.send('regular')
// })
//
// // handler for the /user/:id path, which sends a special response
// app.get('/user/:id', (req, res, next) => {
//   res.send('special')
// })

// |||| path specific middleware
//
// function logOriginalUrl (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }
//
// function logMethod (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// }
//
// const logStuff = [logOriginalUrl, logMethod]
// app.get('/user/:id', logStuff, (req, res, next) => {
//   res.send('User Info')
// })

// ||| router level, router.METHOD or app.METHOD as middleware
////
// // a middleware function with no mount path. This code is executed for every request to the router
// router.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })
//
// // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
// router.use('/user/:id', (req, res, next) => {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, (req, res, next) => {
//   console.log('Request Type:', req.method)
//   next()
// })
//
// // a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', (req, res, next) => {
//   // if the user ID is 0, skip to the next router
//   if (req.params.id === '0') next('route')
//   // otherwise pass control to the next middleware function in this stack
//   else next()
// }, (req, res, next) => {
//   // render a regular page
//   res.render('regular')
// })
//
// // handler for the /user/:id path, which renders a special page
// router.get('/user/:id', (req, res, next) => {
//   console.log(req.params.id)
//   res.render('special')
// })

// ||| next('route') with router and app
//
// router.use((req, res, next) => {
//   if (!req.headers['x-auth'])
//     // this will execute middleware that defined using app.use(...)
//     return next('router')
//   next()
// })
//
// router.get('/user/:id', (req, res) => {
//   res.send('hello, user!')
// })
//
// // this block will be executed if !req.headers['x-auth'] is true
// // use the router and 401 anything falling through
// app.use('/admin', usingMiddlewareRouter, (req, res) => {
//   res.sendStatus(401)
// })

module.exports = router