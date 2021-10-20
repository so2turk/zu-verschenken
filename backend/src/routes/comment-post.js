const express = require('express')
const User = require('../models/user')

const router = express.Router()
const app = require('../src/app')

router.get('/session', (req, res) => {
  res.send(req.user)
})

// Add Post
router.post('/', async (req, res) => {
  await request(app).post(`/api/users/${this.user._id}/commented`).send({ giftId: gift._id, comment: 'niceeee' })

  res.status(201).send()
})

module.exports = router
