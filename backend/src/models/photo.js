const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const photoSchema = new mongoose.Schema({
  filename: String,
  path: String,
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
  ],
})

photoSchema.plugin(autopopulate)
module.exports = mongoose.model('Photo', photoSchema)
