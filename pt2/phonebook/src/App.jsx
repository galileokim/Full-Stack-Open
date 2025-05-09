import { useState } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App