const User = require('./user')
const Gift = require('./gift')

const serhat = new User('serhat', 1980, 's@zturk.com', 'kreuzberg', 10000)
const armagan = new User('armagan', 2000, 'arm@GainNode.com', 'schoneberg', 11000)
const neslihan = new User('neslihan', 2000, 'n@slihan.com', 'antalya', 2000)
const desire = new User('desire', 2000, 'd@sire.com', '-', '-')
const selman = new User('selman', 2000, 's@lman.com', 'mitte', 12000)
const dilek = new User('dilek', 2000, 'dil@k.com', 'mitte', 12000)
const gokce = new User('gokce', 2000, 'g@kce.com', 'mitte', 12000)
const fatma = new User('fatma', 2000, 'f@tma.com', 'mitte', 12000)
const bernard = new User('bernard', 2000, 'b@rnard.com', 'mitte', 12000)
const ceyhan = new User('ceyhan', 2000, 's@lman.com', 'mitte', 12000)

const oldTable = new Gift(
  'old table',
  'furniture',
  '52.489251391027786, 13.39262301870654',
  'outside',
  'in good condition, few scratches',
  ['topLeft', 'bottomLeft']
)
serhat.addGift(oldTable)
const oldMac = new Gift('used mac', 'electronics', 'schoneberg haubtstr.', 'inside', 'better than nothing', [
  'keyboard',
  'screen',
])
armagan.addGift(oldMac)
serhat.showInterest(oldMac)
serhat.makeCommentOn(oldMac, 'is there a ketchup on space button?')
neslihan.showInterest(oldMac)
armagan.showInterest(oldTable)
armagan.makeCommentOn(oldTable, "don't you have chairs?")
const babyTrage = new Gift(
  'limas baby trage',
  'child-baby',
  '52.489251391027786, 13.39262301870654',
  'inside',
  'like a new one',
  ['trage']
)
serhat.addGift(babyTrage)
const backPack = new Gift(
  'best backpack',
  'stuff',
  '52.49896538066073, 13.411730936841417',
  'outside',
  'need small repairment',
  ['']
)
desire.addGift(backPack)
neslihan.showInterest(backPack)
neslihan.makeCommentOn(backPack, 'please keep it.. i will take it..')
desire.makeCommentOn(oldTable, 'if there will be chairs gonna take it..')
neslihan.accept(oldMac)
armagan.accept(oldTable)
serhat.makeCommentOn(backPack, 'sorry.. i am close.. taking it')
serhat.makeCommentOn(oldTable, 'yeah.. sure.. if u want!')
const lamp = new Gift(
  'ikea lamp',
  'living-area',
  '52.521075426921676, 13.403173656345825',
  'outside',
  'nothing fancy',
  []
)
selman.addGift(lamp)
const toys = new Gift('first year toys', 'child-baby', '52.3463463454444, 13.57475687956744', 'outside', 'never used', [
  'toys',
])
dilek.addGift(toys)
gokce.showInterest(toys)
gokce.makeCommentOn(toys, 'they are so cute')
bernard.showInterest(toys)
serhat.showInterest(toys)
serhat.makeCommentOn(toys, "thats exactly what i'm looking for")
const painting = new Gift(
  'landscape painting',
  'living-area',
  '52.54235235235, 13.43234234235',
  'outside',
  'maybe a bit dusty',
  ['painting1', 'painting2']
)
fatma.addGift(painting)
serhat.accept(backPack)
serhat.accept(toys)
ceyhan.accept(painting)
ceyhan.makeCommentOn(painting, 'beautiful.. thank u..')
lamp.anonymous()

console.log(serhat.profile)
console.log(toys.profile)
console.log(desire.profile)
console.log(backPack.profile)
