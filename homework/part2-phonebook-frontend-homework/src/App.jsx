import { useState, useEffect } from 'react'
import Contact from './components/Contact';
import phonebookService from './services/phonebook'

function App() {
  const [phonebookData, setPhonebookData] = useState([])
  const [newName, setNewName] = useState('placeholder')
  const [newNumber, setNewNumber] = useState('3219032109')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    phonebookService.getAll()
      .then(response => {
        setPhonebookData(response)
      })
  }, [])

  function addNewPerson(event) {
    event.preventDefault()
    const newPerson = {
      "name": newName,
      "phone": newNumber
    }
    phonebookService.createPerson(newPerson)
      .then((response) => {
        console.log(response.data)
        setPhonebookData(phonebookData.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  function handleNameChange(event) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }

  function handleFilterChange(event) {
    setNewFilter(event.target.value)
  }

  function deletePerson(id) {
    phonebookService.removePerson(id)
      .then(() => {
        setPhonebookData(phonebookData.filter(person => person.id !== id))
      })
  }

  const filteredPhoneData = phonebookData.filter((person) => person.name.includes(filter));

  return (
    <>
      <h2>Phonebook</h2>
      <p>filtrar <input value={filter} onChange={handleFilterChange}></input></p>
      <ul>
        {
          filteredPhoneData.map((person) => <Contact key={person.id} person={person} deletePerson={deletePerson}></Contact>)
        }
      </ul >

      <h2>Add new number</h2>
      <form>
        <p>
          Nome <input value={newName} onChange={handleNameChange}></input>
        </p>
        <p>
          Telefone <input value={newNumber} onChange={handleNumberChange}></input>
        </p>
        <button onClick={addNewPerson}>Adicionar</button>
      </form>
    </>
  )
}

export default App
