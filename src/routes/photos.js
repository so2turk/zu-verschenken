const express = require('express')

const router = express.Router()
const Photo = require('../models/photo')

/* POST create a photo */
router.post('/', async (req, res) => {
  const createdPhoto = await Photo.create(req.body)
  res.send(createdPhoto)
})

module.exports = router
