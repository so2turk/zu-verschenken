const express = require('express')

const router = express.Router()
const Gift = require('../models/gift')

/* POST create a gift */
router.post('/', async (req, res) => {
  const createdGift = await Gift.create(req.body)
  res.send(createdGift)
})

router.get('/:giftId/json', async (req, res) => {
  const gift = await Gift.findById(req.params.giftId)
  res.send(gift)
})
module.exports = router
