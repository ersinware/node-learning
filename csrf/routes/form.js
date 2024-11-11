// http projesindeki csrf kısmına bak

const router = require('express').Router()

// key - the name of the cookie to use to store the token secret (defaults to '_csrf').
// path - the path of the cookie (defaults to '/').
// signed - indicates if the cookie should be signed (defaults to false).
// secure - marks the cookie to be used with HTTPS only (defaults to false).
// maxAge - the number of seconds after which the cookie will expire (defaults to session length).
// httpOnly - flags the cookie to be accessible only by the web server (defaults to false).
// sameSite - sets the same site policy for the cookie(defaults to false). This can be set to 'strict', 'lax', 'none', or true (which maps to 'strict').
// domain - sets the domain the cookie is valid on(defaults to current domain).

const csrf = require('csurf')

router.use('/', csrf({
  cookie: {
    secure: true,
    httpOnly: true,
    path: '/form',
    sameSite: 'lax',
    // signed: true
  }
}))

router.get('/', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() })
})

router.post('/', (req, res) => {
  res.send('data is being processed')
})

// error handler
// app.use(function (err, req, res, next) {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err)
//
//   // handle CSRF token errors here
//   res.status(403)
//   res.send('form tampered with')
// })

module.exports = router

//Using AJAX
//
// When accessing protected routes via ajax both the csrf token will need to be passed in the request. Typically this is done using a request header,
// as adding a request header can typically be done at a central location easily without payload modification.
//
// The CSRF token is obtained from the req.csrfToken() call on the server-side. This token needs to be exposed to the client-side, typically by
// including it in the initial page content. One possibility is to store it in an HTML <meta> tag, where value can then be retrieved at the time
// of the request by JavaScript.
//
// The following can be included in your view (handlebar example below), where the csrfToken value came from req.csrfToken():
//
// <meta name="csrf-token" content="{{csrfToken}}">
//
// The following is an example of using the Fetch API to post to the /process route with the CSRF token from the <meta> tag on the page:
//
// // Read the CSRF token from the <meta> tag
// var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//
// // Make a request using the Fetch API
// fetch('/process', {
//   credentials: 'same-origin', // <-- includes cookies in the request
//   headers: {
//     'CSRF-Token': token // <-- is the csrf token as a header
//   },
//   method: 'POST',
//   body: {
//     favoriteColor: 'blue'
//   }
// })