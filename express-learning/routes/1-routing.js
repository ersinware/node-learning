// operasyonları daha modülize etmek için, yeni route'lar oluşturabilirsin, örneğin:
// users.js -> userProfileOps, userMessagingOps

const router = require('express').Router()

//// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('users middleware')
//   next()
// })

router
  .route('/')
  .all((req, res, next) => {
    console.log('routing \'all\' middleware')
    next()
  })
  .get((req, res) => {
    res.render('index', { title: 'express-learning' })
  })
  .post((req, res) => {
    res.send(req.url + ' post')
  })
  .put((req, res) => {
    res.send(req.url + ' put')
  })
  .delete((req, res) => {
    res.send(req.url + ' delete')
  })

// OR

// router.get('/', (req, res) => {
//   res.send('Got a GET request')
// })

module.exports = router