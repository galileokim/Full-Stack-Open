const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

personsRouter.get('/info', async (request, response) => {
  const persons = await Person.find({})
  response.send(
    `Phonebook has info for ${persons.length} people` +
      '<br>' +
      `${new Date()}`,
  )
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.delete('/:id', async (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

personsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.number === '' || body.name === '') {
    return response.status(400).json({
      error: 'please enter a name and a number',
    })
  }

  const persons = await Person.find({})

  if (persons.some((n) => n.name === body.name)) {
    return response.status(400).json({
      error: 'name already exists',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    important: body.important || false,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

module.exports = personsRouter