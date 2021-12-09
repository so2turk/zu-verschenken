const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Gift = require('../models/gift')
const Photo = require('../models/photo')
const Comment = require('../models/comment')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.email) {
    query.email = req.query.email
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    birthYear: req.body.birthYear,
    postcode: req.body.postcode,
  }

  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const anonymous = new User({
    name: 'anonymous',
    birthYear: 0,
    email: 'an@nymous.com',
    postcode: 0,
  })
  await anonymous.setPassword('lol')
  await anonymous.save()

  const serhat = new User({
    name: 'Serhat',
    birthYear: 1980,
    email: 's@zturk.com',
    postcode: 10000,
  })
  await serhat.setPassword('lol')
  await serhat.save()

  const armagan = new User({
    name: 'Armagan',
    birthYear: 2000,
    email: 'arm@gan.com',
    postcode: 11000,
  })
  await armagan.setPassword('lol')
  await armagan.save()

  const neslihan = new User({
    name: 'Neslihan',
    birthYear: 2000,
    email: 'n@slihan.com',
    postcode: 0,
  })
  await neslihan.setPassword('lol')
  await neslihan.save()

  const desire = new User({
    name: 'Desire',
    birthYear: 2000,
    email: 'd@sire.com',
    postcode: 0,
  })
  await desire.setPassword('lol')
  await desire.save()

  const selman = new User({
    name: 'Selman',
    birthYear: 2000,
    email: 's@lman.com',
    postcode: 11000,
  })
  await selman.setPassword('lol')
  await selman.save()

  const dilek = new User({
    name: 'Dilek',
    birthYear: 2000,
    email: 'dil@k.com',
    postcode: 11000,
  })
  await dilek.setPassword('lol')
  await dilek.save()

  const gokce = new User({
    name: 'Gokce',
    birthYear: 2000,
    email: 'g@kce.com',
    postcode: 11000,
  })
  await gokce.setPassword('lol')
  await gokce.save()

  const fatma = new User({
    name: 'Fatma',
    birthYear: 2000,
    email: 'f@tma.com',
    postcode: 11000,
  })
  await fatma.setPassword('lol')
  await fatma.save()

  const bernard = new User({
    name: 'Bernard',
    birthYear: 2000,
    email: 'b@rnard.com',
    postcode: 11000,
  })
  await bernard.setPassword('lol')
  await bernard.save()

  const ceyhan = new User({
    name: 'Ceyhan',
    birthYear: 2000,
    email: 'c@yhan.com',
    postcode: 11000,
  })
  await ceyhan.setPassword('lol')
  await ceyhan.save()
  
  const photo1 = await Photo.create({ 
    filename: 'Old Table', 
    path: `https://i.imgur.com/8zHQNPD.jpeg` 
  });
  const oldTable = await Gift.create({
    name: 'Old Table',
    category: 'Furniture',
    geolocation: { lat: 52.489251391027786, lng: 13.39262301870654 },
    location: 'Outside',
    description: 'in good condition, few scratches',
    photos: [photo1],
  })
  await serhat.addGift(oldTable, photo1)

  const photo2 = await Photo.create({ 
    filename: 'Old Mac', 
    path: `https://i.imgur.com/59eOt.jpeg` 
  });
  const oldMac = await Gift.create({
    name: 'Used Mac',
    category: 'Electronics',
    geolocation: { lat: 52.499251391027786, lng: 13.39762301870654 },
    location: 'inside',
    description: 'better than nothing',
    photos: [photo2],
  })
  await armagan.addGift(oldMac, photo2)
  await serhat.showInterest(oldMac)
  const comment1 = await Comment.create({
    text: 'is there a ketchup on space button?',
  })
  await serhat.postComment(oldMac, comment1)
  await neslihan.showInterest(oldMac)
  await armagan.showInterest(oldTable)
  const comment2 = await Comment.create({
    text: "don't you have chairs?",
  })
  await armagan.postComment(oldTable, comment2)
  const photo3 = await Photo.create({ 
    filename: 'Limas Baby Carrier', 
    path: `https://i.imgur.com/YQaUS2x.jpeg` 
  });
  const babyTrage = await Gift.create({
    name: 'Limas Baby Trage',
    category: 'Child-Baby',
    geolocation: { lat: 52.479251391027786, lng: 13.38262301870654 },
    location: 'Inside',
    description: 'like a new one',
    photos: [photo3],
  })
  await serhat.addGift(babyTrage, photo3)
  const photo4 = await Photo.create({ 
    filename: 'back pack', 
    path: `https://i.imgur.com/p3tvTzP.jpeg` 
  });
  const backPack = await Gift.create({
    name: 'Best Backpack',
    category: 'Others',
    geolocation: { lat: 52.489251391027786, lng: 13.39262301870654 },
    location: 'Outside',
    description: 'need small repairment',
    photos: [photo4],
  })
  await desire.addGift(backPack, photo4)
  await neslihan.showInterest(backPack)
  const comment3 = await Comment.create({
    text: 'please keep it.. i will take it..',
  })
  await neslihan.postComment(backPack, comment3)
  const comment4 = await Comment.create({
    text: 'if there will be chairs gonna take it..',
  })
  await desire.postComment(oldTable, comment4)
  await neslihan.accept(oldMac)
  await armagan.accept(oldTable)
  const comment5 = await Comment.create({
    text: 'sorry.. i am close.. taking it',
  })
  await serhat.postComment(backPack, comment5)
  const comment6 = await Comment.create({
    text: 'yeah.. sure.. if u want!',
  })
  await serhat.postComment(oldTable, comment6)
  const photo5 = await Photo.create({ 
    filename: 'ikea lamp', 
    path: `https://i.imgur.com/6nwaem9.jpeg` 
  });
  const lamp = await Gift.create({
    name: 'Ikea Lamp',
    category: 'Living-Area',
    geolocation: { lat: 52.469251391027786, lng: 13.37262301870654 },
    location: 'Outside',
    description: 'nothing fancy',
    photos: [photo5],
  })
  await selman.addGift(lamp, photo5)
  const photo6 = await Photo.create({ 
    filename: 'toys', 
    path: `https://i.imgur.com/XQK6XYA.jpeg` 
  });
  const toys = await Gift.create({
    name: 'First Year Toys',
    category: 'Child-Baby',
    geolocation: { lat: 52.459251391027786, lng: 13.39262301870654 },
    location: 'Outside',
    description: 'never used',
    photos: [photo6],
  })
  await dilek.addGift(toys, photo6)
  await gokce.showInterest(toys)
  const comment7 = await Comment.create({
    text: 'they are so cute',
  })
  await gokce.postComment(toys, comment7)
  await bernard.showInterest(toys)
  await serhat.showInterest(toys)
  const comment8 = await Comment.create({
    text: "thats exactly what i'm looking for",
  })
  await serhat.postComment(toys, comment8)
  const photo7 = await Photo.create({ 
    filename: 'painting', 
    path: `https://i.imgur.com/MRhYAHD.png` 
  });
  const painting = await Gift.create({
    name: 'Landscape Painting',
    category: 'Living-Area',
    geolocation: { lat: 52.449251391027786, lng: 13.36262301870654 },
    location: 'Outside',
    description: 'maybe a bit dusty',
    photos: [photo7],
  })
  await fatma.addGift(painting, photo7)
  await serhat.accept(backPack)
  await serhat.accept(toys)
  await ceyhan.accept(painting)
  const comment9 = await Comment.create({
    text: "beautiful.. thank u..",
  })
  await ceyhan.postComment(painting, comment9)
  await anonymous.accept(lamp)
  await selman.accept(babyTrage)

  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

router.post('/:userId/added', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const gift = await Gift.findById(req.body.giftId)

  await user.addGift(gift)
  res.sendStatus(200)
})

router.post('/:userId/interested', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const gift = await Gift.findById(req.body.giftId)

  await user.showInterest(gift)
  res.sendStatus(200)
})

router.post('/:userId/commented', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const gift = await Gift.findById(req.body.giftId)

  res.sendStatus(200)
})

router.post('/:userId/took', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const gift = await Gift.findById(req.body.giftId)

  await user.accept(gift)
  res.sendStatus(200)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

router.post('/interested', async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const gift = await Gift.findById(req.body.giftId)
  if(!gift) return res.sendStatus(404)

  await req.user.showInterest(gift)
  res.sendStatus(200)
})

router.delete('/unInterested/:giftId', async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const gift = await Gift.findById(req.params.giftId)
  if(!gift) return res.sendStatus(404)

  await req.user.deleteInterest(gift)
  res.status(200).send()
})

router.post('/addGift', async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const giftTocreate = await Gift.create({
    name: req.body.name,
    category: req.body.category,
    geolocation: req.body.geolocation,
    location: req.body.location,
    description: req.body.description,
  })
  await req.user.addGift(giftTocreate)
  res.status(200).send()
})

router.post('/addGiftPhoto', async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const photo = await Photo.create({
    filename: req.body.filename,
    path: req.body.path,
    imgId: req.body.imgId,
    del: req.body.del
  })
  const gift = await Gift.create({
    name: req.body.name,
    category: req.body.category,
    geolocation: req.body.geolocation,
    location: req.body.location,
    description: req.body.description,
  })
  await req.user.addGiftPhoto(gift, photo)
  res.status(200).send()
})

router.post('/take', async (req, res) => {
  const user = await User.findById(req.body.userId)
  const gift = await Gift.findById(req.body.giftId)

  await user.accept(gift)
  res.sendStatus(200)
})

router.post('/leave', async (req, res) => {
  const user = await User.findById(req.body.userId)
  const gift = await Gift.findById(req.body.giftId)

  await user.leave(gift)
  res.sendStatus(200)
})

module.exports = router
