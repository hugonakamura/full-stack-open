require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let phonebook = [
//     {
//         name: "Hugo Nakamura",
//         phone: "11 39393993",
//         id: "1",
//     },
//     {
//         name: "Don Tod",
//         phone: "15 52398052",
//         id: "2",
//     },
//     {
//         name: "Pedro goat",
//         phone: "19 4893414123",
//         id: "3",
//     }
// ]

app.get('/api/phonebook', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
});

app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        const message = `Phonebook has info for ${contacts.length} people`
        response.send(message)
    })
})

app.get('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id

    Contact.findById(id).then(contact => {
        if (contact) {
            response.json(contact)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id
    const { name, phone } = request.body

    Contact.findById(id).then(contact => {
        if (!contact) {
            return response.status(404).end()
        }

        contact.name = name
        contact.phone = phone

        return contact.save().then((updatedContact) => {
            response.json(updatedContact)
        })
    })
        .catch(error => next(error))
})

app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    const contact = new Contact({
        'name': body.name,
        'phone': body.phone || '',
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})

app.delete('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id

    Contact.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('server running on PORT', PORT)