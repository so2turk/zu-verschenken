const express = require('express')

const router = express.Router()
const axios = require('axios')

const Gift = require('../models/gift')
const Photo = require('../models/photo')

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

router.delete('/:giftId', async (req, res) => {
  const gift = await Gift.findByIdAndDelete(req.params.giftId)

  if (gift) res.send(gift)
  else res.sendStatus(404)
})

router.post('/delGift', async (req, res) => {
  const gift = await Gift.findById(req.body.giftId)

  for(let i=0; i<gift.interestBy.length; i++){
    await gift.delInterest(gift.interestBy[i])
  }
  for(let i=0; i<gift.acceptBy.length; i++){
    await gift.delTake(gift.acceptBy[i])
  }
  for(let i=0; i<gift.comments.length; i++){
    await gift.delComment(gift.comments[i])
  }
  const ID = ''
  for(let i=0; i<gift.photos.length; i++){
    await axios.delete("https://api.imgur.com/3/image/" + gift.photos[i].del,{
    method: "delete", headers: { Authorization: `Client-ID ${ID}` },
    })
    await Photo.findByIdAndDelete(gift.photos[i]._id)
  }

  await Gift.findByIdAndDelete(req.body.giftId)
  await gift.delPresent(gift.presentBy)

  res.status(200).send(gift)
})

router.get('/:giftId/json', async (req, res) => {
  const gift = await Gift.findById(req.params.giftId)
  res.send(gift)
})

module.exports = router
