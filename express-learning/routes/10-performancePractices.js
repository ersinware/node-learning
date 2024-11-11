const router = require('express').Router()

// always use asynchronous APIs
// you can use the --trace-sync-io command-line flag to print a warning and a stack trace whenever your application uses a synchronous API.

//

// Set NODE_ENV to “production”
// The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production).
// One of the simplest things you can do to improve performance is to set NODE_ENV to “production.”
// Setting NODE_ENV to “production” makes Express:
//   Cache view templates.
//   Cache CSS files generated from CSS extensions.
//   Generate less verbose error messages.

// process.env.NODE_ENV = 'production';
// or you can run your app like this:
// NODE_ENV=production node secureApp.js

// This can improve app performance by a factor of three!

module.exports = router
