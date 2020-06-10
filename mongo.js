const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@puhelinluettelodatabase-rnjnb.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const AddPerson = () => {
  if (process.argv.length !== 5) {
    console.log('wrong amount of arguments')
    process.exit(1)
  }
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: `${name}`,
    number: `${number}`
  })

  person.save()
    .then(response => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch(error => {
      console.log('------------')
      console.log(`${error.message}`)
      console.log('------------')
      mongoose.connection.close()
    })
}

const PrintPeople = () => {
  console.log('phonebook:')
  Person
    .find ({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
  PrintPeople()
} else {
  AddPerson()
}