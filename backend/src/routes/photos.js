const express = require('express')

const router = express.Router()
const Photo = require('../models/photo')

/* POST create a photo */
router.post('/', async (req, res) => {
  const photoToCreate = {
    filename: req.body.filename,
  }

  const createdPhoto = await Photo.create(photoToCreate)
  res.send(createdPhoto)
})

module.exports = router
