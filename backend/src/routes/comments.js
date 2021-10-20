const express = require('express')

const router = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Gift = require('../models/gift')

// GET THE LIST
router.get('/', async (req, res) => {
  const query = {}
  if (req.query._id) query._id = req.query._id

  res.send(await Comment.find(query))
})

// GET BY ID
router.get('/:Id', async (req, res) => {
  const comment = await Comment.findById(req.params.Id)

  if (comment) res.send(comment)
  else res.sendStatus(404)
})

// GET BY ID/JSON
router.get('/:Id/json', async (req, res) => {
  const comment = await Comment.findById(req.params.Id)
  res.send(comment)
})

/// CREATE
/* router.post('/', async (req, res) => {
  const postedComment = await Comment.create(req.body)

  res.status(201).send()
})  
 */
// CREATE 
router.post('/', async (req, res) => {
  const postedComment = await Comment.create(req.body)
  // const commentedUser = await User.findById(req.body.userId)
  // const commentedGift = await Gift.findById(req.body.giftId)
  const commentedUser = await User.findById(req.body.user._id)
  const commentedGift = await Gift.findById(req.body.gift._id)

  commentedUser.comments.push(postedComment)
  commentedGift.comments.push(postedComment)
    
  await commentedUser.save()
  await commentedGift.save()
  res.status(201).send()
})  

// DELETE BY ID
router.delete('/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id)
  res.status(200).send()
})

module.exports = router
