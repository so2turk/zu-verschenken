const express = require('express')
const passport = require('passport')

const Main = require('../models/main')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.main)
})

router.post('/', async (req, res, next) => {
  const { name, birthYear, email, address, postcode, password } = req.body

  try {
    const main = await Main.register({ name, birthYear, email, address, postcode }, password)
    res.send(main)
  } catch (e) {
    next(e)
  }
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.main)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
