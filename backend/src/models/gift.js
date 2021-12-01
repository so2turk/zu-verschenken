const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Comment = require('../models/comment')

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
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
  geolocation: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  location: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: { maxDepth: 1 },
    },
  ],
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: { maxDepth: 2 },
    },
  ],
  acceptBy: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 2 },
    }
  ],
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

  async delPresent(user){
    user.present.splice(user.present.findIndex(g => this._id.toString() == g._id.toString()), 1)
    await user.save()
  }
  async delTake(user){
    user.acceptThat.splice(user.acceptThat.findIndex(g => this._id.toString() == g._id.toString()), 1)

    await user.save()
  }
  async delInterest(user){
    user.interestIn.splice(user.interestIn.findIndex(g => g._id.toString() == this._id.toString()), 1)

    await user.save()
  }
  async delComment(comment){
    comment.user.comments.splice(comment.user.comments.findIndex(c => comment._id.toString() == c._id.toString()), 1)

    await comment.user.save()
    await Comment.findByIdAndDelete(comment._id)
  }
}

giftSchema.loadClass(Gift)
giftSchema.plugin(autopopulate)

module.exports = mongoose.model('Gift', giftSchema)
