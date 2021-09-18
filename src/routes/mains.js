const express = require('express')

const router = express.Router()

const Main = require('../models/main')
const Gift = require('../models/gift')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.email) {
    query.email = req.query.email
  }

  res.send(await Main.find(query))
})

router.get('/initialize', async (req, res) => {
  const anonymous = await Main.create({
    name: 'anonymous',
    birthYear: 0,
    email: '0',
    address: '0',
    postcode: 0,
  })
  const serhat = await Main.create({
    name: 'serhat',
    birthYear: 1980,
    email: 's@zturk.com',
    address: 'kreuzberg',
    postcode: 10000,
  })
  const armagan = await Main.create({
    name: 'armagan',
    birthYear: 2000,
    email: 'arm@GainNode.com',
    address: 'schoneberg',
    postcode: 11000,
  })
  const neslihan = await Main.create({
    name: 'neslihan',
    birthYear: 2000,
    email: 'n@slihan.com',
    address: 'antalya',
    postcode: 0,
  })
  const desire = await Main.create({
    name: 'desire',
    birthYear: 2000,
    email: 'd@sire.com',
    address: '-',
    postcode: 0,
  })
  const selman = await Main.create({
    name: 'selman',
    birthYear: 2000,
    email: 's@lman.com',
    address: 'mitte',
    postcode: 11000,
  })
  const dilek = await Main.create({
    name: 'dilek',
    birthYear: 2000,
    email: 'dil@k.com',
    address: 'mitte',
    postcode: 11000,
  })
  const gokce = await Main.create({
    name: 'gokce',
    birthYear: 2000,
    email: 'g@kce.com',
    address: 'mitte',
    postcode: 11000,
  })
  const fatma = await Main.create({
    name: 'fatma',
    birthYear: 2000,
    email: 'f@tma.com',
    address: 'mitte',
    postcode: 11000,
  })
  const bernard = await Main.create({
    name: 'bernard',
    birthYear: 2000,
    email: 'b@rnard.com',
    address: 'mitte',
    postcode: 11000,
  })
  const ceyhan = await Main.create({
    name: 'ceyhan',
    birthYear: 2000,
    email: 'c@yhan.com',
    address: 'mitte',
    postcode: 11000,
  })

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
  const user = await Main.findById(req.params.userId)

  if (user) res.render('main', { user })
  else res.sendStatus(404)
})

module.exports = router
