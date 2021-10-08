const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: [],
  presentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 2 },
  },
  interestBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 2 },
    },
  ],
  commentBy: [
    {
      commentingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 2 },
      },
      comment: String,
    },
  ],
  acceptBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 2 },
  },
  presentDate: Date,
  acceptDate: Date,
})

class Gift {
  get status() {
    return this.perished(this.presentDate)
  }

  perished(presentDate) {
    const now = new Date()
    const timeDiff = (now - presentDate) / 1000 / 60 / 60 / 24
    if (this.acceptBy.length > 0) return `already taken by ${this.acceptBy}`
    if (timeDiff <= 2) return `${Math.floor(timeDiff)} day(s) passed.. may still be there`
    return `${Math.floor(timeDiff)} day(s) passed.. nobody took it.. probably perished`
  }
}

giftSchema.loadClass(Gift)
giftSchema.plugin(autopopulate)

module.exports = mongoose.model('Gift', giftSchema)
