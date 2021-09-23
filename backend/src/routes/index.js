const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'zu Verschenken' })
})

router.get('/bootstrap', (req, res) => {
  res.render('bootstrap', { title: 'bootstrap' })
})

module.exports = router
