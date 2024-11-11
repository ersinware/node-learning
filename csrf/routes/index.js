const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'csrf' })
})

module.exports = router