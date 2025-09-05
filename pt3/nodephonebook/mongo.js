const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://galileokim451:${password}@cluster0.tbpqlw6.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  // important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

// person.save().then(result => {
//   console.log('person saved')
//   mongoose.connection.close()
// })

// you can specify search conditions in the object parameter

Person.find({}).then(result => {
  result.forEach(p => {
    console.log(p)
  })
  mongoose.connection.close()
})