const router = require('express').Router()

router.get('/:id', (req, res) => {
  res.send(req.params)
})

module.exports = router

// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }

// To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):
// Route path: /user/:userId(\d+)
// Request URL: http://localhost:3000/user/42
// req.params: {"userId": "42"}