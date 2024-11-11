const router = require('express').Router()

// ||| methods
//
//You can override the signature and behavior of existing methods with your own, by assigning a custom function.
//
// Following is an example of overriding the behavior of res.sendStatus.
//
// app.response.sendStatus = function (statusCode, type, message) {
//   // code is intentionally kept simple for demonstration purpose
//   return this.contentType(type)
//     .status(statusCode)
//     .send(message)
// }
//
// The above implementation completely changes the original signature of res.sendStatus. It now accepts a status code, encoding type, and the message to be sent to the client.
// The overridden method may now be used this way:
//
// res.sendStatus(404, 'application/json', '{"error":"resource not found"}')

// ||| properties
//
// Properties in the Express API are either:
//
// Assigned properties (ex: req.baseUrl, req.originalUrl)
// Defined as getters (ex: req.secure, req.ip)
//
// Since properties under category 1 are dynamically assigned on the request and response objects in the context of the current request-response cycle, their behavior cannot be overridden.
// Properties under category 2 can be overwritten using the Express API extensions API.
// The following code rewrites how the value of req.ip is to be derived. Now, it simply returns the value of the Client-IP request header.
//
// Object.defineProperty(app.request, 'ip', {
//   configurable: true,
//   enumerable: true,
//   get () { return this.get('Client-IP') }
// })


module.exports = router