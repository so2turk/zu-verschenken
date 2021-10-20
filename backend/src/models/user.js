const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: { maxDepth: 0 },
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

  async postComment(gift, comment) {
    comment.user = this
    comment.gift = gift
    comment.createdAt = new Date()
    this.comments.push(comment)
    gift.comments.push(comment)
    
    await this.save()
    await gift.save()
    await comment.save()
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
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
