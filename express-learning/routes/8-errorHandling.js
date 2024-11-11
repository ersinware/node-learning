// If you pass anything to the next() function (except the string 'route'),
// Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.

const router = require('express').Router()

// Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous code throws an error,
// then Express will catch and process it. For example:
// router.get('/', (req, res) => {
//   throw new Error('BROKEN') // Express will catch this on its own.
// })

//

// For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function,
// where Express will catch and process them. For example:
//
// app.get('/', (req, res, next) => {
//   fs.readFile('/file-does-not-exist', (err, data) => {
//     if (err) {
//       next(err) // Pass errors to Express.
//     } else {
//       res.send(data)
//     }
//   })
// })

//

// Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error. For example:
//
// app.get('/user/:id', async (req, res, next) => {
//   const user = await getUserById(req.params.id)
//   res.send(user)
// })
//
// If getUserById throws an error or rejects, next will be called with either the thrown error or the rejected value. If no rejected value is provided,
// next will be called with a default Error object provided by the Express router.

//

// if the callback in a sequence provides no data, only errors, you can simplify this code as follows:
//
// app.get('/', [
//   function (req, res, next) {
//     fs.writeFile('/inaccessible-path', 'data', next)
//   },
//   function (req, res) {
//     res.send('OK')
//   }
// ])
//
// In the above example next is provided as the callback for fs.writeFile, which is called with or without errors.
// If there is no error the second handler is executed, otherwise Express catches and processes the error.

//

// You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing. For example:
// app.get('/', (req, res, next) => {
//   setTimeout(() => {
//     try {
//       throw new Error('BROKEN')
//     } catch (err) {
//       next(err)
//     }
//   }, 100)
// })
//
// Use promises to avoid the overhead of the try...catch block or when using functions that return promises. For example:
// app.get('/', (req, res, next) => {
//   Promise.resolve().then(() => {
//     throw new Error('BROKEN')
//   }).catch(next) // Errors will be passed to Express.
// })
// Since promises automatically catch both synchronous errors and rejected promises, you can simply provide next as the final catch
// handler and Express will catch errors, because the catch handler is given the error as the first argument.

//

// You could also use a chain of handlers to rely on synchronous error catching, by reducing the asynchronous code to something trivial. For example:
//
// app.get('/', [
//   function (req, res, next) {
//     fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
//       res.locals.data = data
//       next(err)
//     })
//   },
//   function (req, res) {
//     res.locals.data = res.locals.data.split(',')[1]
//     res.send(res.locals.data)
//   }
// ])
//
// The above example has a couple of trivial statements from the readFile call. If readFile causes an error, then it passes the error to Express,
// otherwise you quickly return to the world of synchronous error handling in the next handler in the chain. Then, the example above tries to process the data.
// If this fails then the synchronous error handler will catch it. If you had done this processing inside the readFile callback then the application might exit and
// the Express error handlers would not run.

//

module.exports = router