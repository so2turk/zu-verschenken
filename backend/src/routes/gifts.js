const express = require('express')

const router = express.Router()
const axios = require('axios')

const Gift = require('../models/gift')

/* GET gifts listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.address) {
    query.address = req.query.address
  }

  res.send(await Gift.find(query))
})

// POST create a gift 
router.post('/', async (req, res) => {
  const createdGift = await Gift.create(req.body)
  res.status(201).send()
})

router.get('/:giftId', async (req, res) => {
  const gift = await Gift.findById(req.params.giftId)

  if (gift) res.send(gift)
  else res.sendStatus(404)
})

router.get('/:giftId/json', async (req, res) => {
  const gift = await Gift.findById(req.params.giftId)
  res.send(gift)
})

module.exports = router
