const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
  // userId: {
  //   type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  gift: {
  // giftId: {
  //   type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
    autopopulate: { maxDepth: 1 },
  },
  createdAt: Date,
}, { versionKey: false })

class Comment { }

commentSchema.loadClass(Comment)
commentSchema.plugin(autopopulate)

module.exports = mongoose.model('Comment', commentSchema)
