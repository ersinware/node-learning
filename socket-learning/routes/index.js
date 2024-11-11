const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'socket-learning' })
})

module.exports = router