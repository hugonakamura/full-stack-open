require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = [
    {
        name: "Hugo Nakamura",
        phone: "11 39393993",
        id: "1",
    },
    {
        name: "Don Tod",
        phone: "15 52398052",
        id: "2",
    },
    {
        name: "Pedro goat",
        phone: "19 4893414123",
        id: "3",
    }
]

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
});

app.get('/info', (request, response) => {
    const message = `Phonebook has info for ${phonebook.length} people`
    response.send(message)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id

    const person = phonebook.find(person => person.id === id)

    if (!person) {
        response.status(404).end()
    } else {
        response.json(person)
    }
})

const generateId = () => {
    return String(Math.floor(Math.random() * 999))
}

app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    const person = {
        'name': body.name,
        'phone': body.phone || '',
        'id': generateId()
    }

    phonebook = phonebook.concat(person)

    response.json(person)
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('server running on PORT', PORT)