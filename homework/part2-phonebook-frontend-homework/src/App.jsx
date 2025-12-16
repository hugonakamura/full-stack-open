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

  function addNewContact(event) {
    event.preventDefault()
    const newContact = {
      "name": newName,
      "phone": newNumber
    }

    const existingContact = phonebookData.find(contact => contact.name === newName);

    if (existingContact) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        phonebookService.updateContact(newContact, existingContact.id)
          .then((response) => {
            setPhonebookData(phonebookData.map(contact => contact.id !== existingContact.id ? contact : response))
            resetForm()
          })
          .catch(error => {
            console.error("Error updating contact", error)
          })
      }
    } else {
      phonebookService.createContact(newContact)
        .then((response) => {
          setPhonebookData(phonebookData.concat(response))
          resetForm()
        })
    }
  }

  function resetForm() {
    setNewName('')
    setNewNumber('')
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

  function deleteContact(id) {
    phonebookService.removeContact(id)
      .then(() => {
        setPhonebookData(phonebookData.filter(contact => contact.id !== id))
      })
  }

  const filteredPhoneData = phonebookData.filter((contact) => contact.name.includes(filter));

  return (
    <>
      <h2>Phonebook</h2>
      <p>filtrar <input value={filter} onChange={handleFilterChange}></input></p>
      <ul>
        {
          filteredPhoneData.map((contact) => <Contact key={contact.id} contact={contact} deleteContact={deleteContact}></Contact>)
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
        <button onClick={addNewContact}>Adicionar</button>
      </form>
    </>
  )
}

export default App
