const mongoose = require('mongoose')

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE

mongoose.set('debug', true)

mongoose
  .connect(`mongodb+srv://${username}:${password}@cluster0.sqypy.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection established'))
  .catch(console.log)

// const Panda = mongoose.model('Panda', { name: String, age: Number })

// async function main() {
//   const pandas = await Panda.find({ age: { $gte: 18, $lte: 21 }, name: 'anna' })
//   console.log(pandas)
// }

// main()

// const panda = new Panda({ name: 'anna', age: 19 })
// panda.save().then(() => console.log(`we have a new panda, ${panda.name}!`))
