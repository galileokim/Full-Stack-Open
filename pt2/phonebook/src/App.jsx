import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import peopleServices from './services/people'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [updateMessage, setUpdateMessage] = useState(null)

  useEffect(() => {peopleServices.getAll().then(initialPeople => setPersons(initialPeople))}, [])

  const nameChange = (event) => setNewName(event.target.value)

  const numberChange = (event) => setNewNumber(event.target.value) 
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} exists in the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    } 
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    peopleServices.create(personObject).then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }).then(() => {
      setUpdateMessage(`${personObject.name} was added to the phonebook`)
      setTimeout(() => {
        setUpdateMessage(null)
      }, 5000)
    }).catch(error => {
      console.log(error.response.data.error)
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`do you want to delete ${person.name}?`)) {
      peopleServices
        .remove(id)
        .then(deleted => {
          if (deleted) {
            setPersons(persons.filter(p => p.id != id))
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={updateMessage} />
      <PersonForm addPerson={addPerson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}
 
export default App