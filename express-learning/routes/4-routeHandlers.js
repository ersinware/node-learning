const router = require('express').Router()

router.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})

//

router.get(
  '/example/b',
  (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  },
  (req, res) => {
    res.send('Hello from B!')
  })

//

const c1 = (req, res, next) => {
  console.log('CB0')
  next()
}

const c2 = (req, res, next) => {
  console.log('CB1')
  next()
}

const c3 = (req, res) => {
  res.send('Hello from C!')
}

router.get('/example/c', [c1, c2, c3])

//

const d1 = function (req, res, next) {
  console.log('CB0')
  next()
}

const d2 = function (req, res, next) {
  console.log('CB1')
  next()
}

router.get(
  '/example/d',
  [d1, d2],
  (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  },
  (req, res) => {
    res.send('Hello from D!')
  })

// Method 	        Description
// res.download() 	Prompt a file to be downloaded.
// res.end() 	      End the response process.
// res.json() 	    Send a JSON response.
// res.jsonp()    	Send a JSON response with JSONP support.
// res.redirect() 	Redirect a request.
// res.render() 	  Render a view template.
// res.send()     	Send a response of various types.
// res.sendFile() 	Send a file as an octet stream.
// res.sendStatus() Set the response status code and send its string representation as the response body.

module.exports = router