const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.iwpseqo.mongodb.net/phoneBook?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')
  
      const person = new Person({
        name: name,
        number: number
      })
  
      return person.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))    
} else if (process.argv.length == 3) {
    mongoose
    .connect(url)
    .then((result) => {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
            })
    })
} else {
    console.log('Usage: node mongo.js <password> OR node mongo.js <password> <name> <number>')
    process.exit(1)
}     


