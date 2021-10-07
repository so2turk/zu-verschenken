const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  birthYear: Number,
  address: String,
  present: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 2 },
    },
  ],
  interestIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 2 },
    },
  ],
  commentOn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 2 },
    },
    {
      type: String,
    },
  ],
  acceptThat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 2 },
    },
  ],
})

class User {
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
    gift.commentBy.push({ commentingUser: this, comment })

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

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)
