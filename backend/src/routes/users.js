const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Gift = require('../models/gift')
const Photo = require('../models/photo')

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
    address: req.body.address,
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
    address: '0',
    postcode: 0,
  })
  await anonymous.setPassword('lol')
  await anonymous.save()

  const serhat = new User({
    name: 'serhat',
    birthYear: 1980,
    email: 's@zturk.com',
    address: 'kreuzberg',
    postcode: 10000,
  })
  await serhat.setPassword('lol')
  await serhat.save()

  const armagan = new User({
    name: 'armagan',
    birthYear: 2000,
    email: 'arm@gan.com',
    address: 'schoneberg',
    postcode: 11000,
  })
  await armagan.setPassword('lol')
  await armagan.save()

  const neslihan = new User({
    name: 'neslihan',
    birthYear: 2000,
    email: 'n@slihan.com',
    address: 'antalya',
    postcode: 0,
  })
  await neslihan.setPassword('lol')
  await neslihan.save()

  const desire = new User({
    name: 'desire',
    birthYear: 2000,
    email: 'd@sire.com',
    address: '-',
    postcode: 0,
  })
  await desire.setPassword('lol')
  await desire.save()

  const selman = new User({
    name: 'selman',
    birthYear: 2000,
    email: 's@lman.com',
    address: 'mitte',
    postcode: 11000,
  })
  await selman.setPassword('lol')
  await selman.save()

  const dilek = new User({
    name: 'dilek',
    birthYear: 2000,
    email: 'dil@k.com',
    address: 'mitte',
    postcode: 11000,
  })
  await dilek.setPassword('lol')
  await dilek.save()

  const gokce = new User({
    name: 'gokce',
    birthYear: 2000,
    email: 'g@kce.com',
    address: 'mitte',
    postcode: 11000,
  })
  await gokce.setPassword('lol')
  await gokce.save()

  const fatma = new User({
    name: 'fatma',
    birthYear: 2000,
    email: 'f@tma.com',
    address: 'mitte',
    postcode: 11000,
  })
  await fatma.setPassword('lol')
  await fatma.save()

  const bernard = new User({
    name: 'bernard',
    birthYear: 2000,
    email: 'b@rnard.com',
    address: 'mitte',
    postcode: 11000,
  })
  await bernard.setPassword('lol')
  await bernard.save()

  const ceyhan = new User({
    name: 'ceyhan',
    birthYear: 2000,
    email: 'c@yhan.com',
    address: 'mitte',
    postcode: 11000,
  })
  await ceyhan.setPassword('lol')
  await ceyhan.save()

  const oldTable = await Gift.create({
    name: 'old table',
    category: 'furniture',
    address: '52.489251391027786, 13.39262301870654',
    location: 'outside',
    description: 'in good condition, few scratches',
    photos: ['topLeft', 'bottomLeft'],
  })
  await serhat.addGift(oldTable)
  const oldMac = await Gift.create({
    name: 'used mac',
    category: 'electronics',
    address: 'schoneberg haubtstr.',
    location: 'inside',
    description: 'better than nothing',
    photos: ['keyboard', 'screen'],
  })
  await armagan.addGift(oldMac)
  await serhat.showInterest(oldMac)
  await serhat.makeCommentOn(oldMac, 'is there a ketchup on space button?')
  await neslihan.showInterest(oldMac)
  await armagan.showInterest(oldTable)
  await armagan.makeCommentOn(oldTable, "don't you have chairs?")
  const babyTrage = await Gift.create({
    name: 'limas baby trage',
    category: 'child-baby',
    address: '52.489251391027786, 13.39262301870654',
    location: 'inside',
    description: 'like a new one',
    photos: ['trage'],
  })
  await serhat.addGift(babyTrage)
  const backPack = await Gift.create({
    name: 'best backpack',
    category: 'stuff',
    address: '52.49896538066073, 13.411730936841417',
    location: 'outside',
    description: 'need small repairment',
    photos: [''],
  })
  await desire.addGift(backPack)
  await neslihan.showInterest(backPack)
  await neslihan.makeCommentOn(backPack, 'please keep it.. i will take it..')
  await desire.makeCommentOn(oldTable, 'if there will be chairs gonna take it..')
  await neslihan.accept(oldMac)
  await armagan.accept(oldTable)
  await serhat.makeCommentOn(backPack, 'sorry.. i am close.. taking it')
  await serhat.makeCommentOn(oldTable, 'yeah.. sure.. if u want!')
  const lamp = await Gift.create({
    name: 'ikea lamp',
    category: 'living-area',
    address: '52.521075426921676, 13.403173656345825',
    location: 'outside',
    description: 'nothing fancy',
    photos: [],
  })
  await selman.addGift(lamp)
  const toys = await Gift.create({
    name: 'first year toys',
    category: 'child-baby',
    address: '52.3463463454444, 13.57475687956744',
    location: 'outside',
    description: 'never used',
    photos: ['toys'],
  })
  await dilek.addGift(toys)
  await gokce.showInterest(toys)
  await gokce.makeCommentOn(toys, 'they are so cute')
  await bernard.showInterest(toys)
  await serhat.showInterest(toys)
  await serhat.makeCommentOn(toys, "thats exactly what i'm looking for")
  const painting = await Gift.create({
    name: 'landscape painting',
    category: 'living-area',
    address: '52.54235235235, 13.43234234235',
    location: 'outside',
    description: 'maybe a bit dusty',
    photos: ['painting1', 'painting2'],
  })
  await fatma.addGift(painting)
  await serhat.accept(backPack)
  await serhat.accept(toys)
  await ceyhan.accept(painting)
  await ceyhan.makeCommentOn(painting, 'beautiful.. thank u..')
  anonymous.accept(lamp)

  console.log(serhat)
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

  await user.makeCommentOn(gift, req.body.comment)
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

module.exports = router
