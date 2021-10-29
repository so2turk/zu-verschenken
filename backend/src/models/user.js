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
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: { maxDepth: 1 },
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

  async deleteInterest(gift) {
    this.interestIn.splice(this.interestIn.findIndex(g => g._id == gift._id), 1)
    gift.interestBy.splice(gift.interestBy.findIndex(u => u._id == this._id), 1)
    
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

  async addAvatar(avatar) {
    this.photos.push(avatar);

    await this.save();
  }

  async addPhoto(photo, gift) {
    this.photos.push(photo);
    gift.photos.push(photo)

    await this.save();
    await gift.save();
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
