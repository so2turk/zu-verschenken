const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const mainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  birthYear: Number,
  address: String,
  present: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 1 },
    },
  ],
  interestIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 1 },
    },
  ],
  commentOn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 1 },
    },
    {
      type: String,
    },
  ],
  acceptThat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

class Main {
  async addGift(gift) {
    this.present.push(gift)
    gift.presentDate = new Date()
    gift.presentBy = this

    await this.save()
    await gift.save()
  }

  async showInterest(gift) {
    this.interestIn.push(gift)
    gift.interestBy.push(this)

    await this.save()
    await gift.save()
  }

  async makeCommentOn(gift, comment) {
    this.commentOn.push({ gift, comment })
    gift.commentBy.push({ user: this, comment })

    await this.save()
    await gift.save()
  }

  async accept(gift) {
    gift.acceptBy = this
    gift.acceptDate = new Date()
    this.acceptThat.push(gift)

    await this.save()
    await gift.save()
  }
}

mainSchema.loadClass(Main)
mainSchema.plugin(autopopulate)

module.exports = mongoose.model('Main', mainSchema)
