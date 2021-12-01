const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const photoSchema = new mongoose.Schema({
  filename: String,
  path: String,
  imgId: String,
  del: String,
  gift: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
      autopopulate: { maxDepth: 1 },
    },
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ]
}, { versionKey: false })

class Photo {
  async addAvatar(user) {
    this.user = user
    user.photos = this;

    await user.save();
    await this.save();
  }

  async addPhoto(user, gift) {
    this.user.push(user);
    gift.photos.push(this)
    user.photos.push(this);

    await this.save();
    await user.save();
    await gift.save();
  }
}

photoSchema.loadClass(Photo)
photoSchema.plugin(autopopulate)

module.exports = mongoose.model('Photo', photoSchema)
