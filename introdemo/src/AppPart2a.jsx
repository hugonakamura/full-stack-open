import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNetNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }


    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNetNote('')
      })
  }

  const noteChange = (event) => {
    setNetNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>



      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={noteChange} />
        <button type="submit">save</button>
      </form>
      <Footer></Footer>
    </div>
  )
}

export default App