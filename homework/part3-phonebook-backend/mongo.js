const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hugognakamura_db_user:${password}@cluster0.u68ne9z.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const phone = process.argv[4]

    const contact = new Contact({
        name,
        phone,
    })

    contact.save().then(result => {
        console.log(`added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.phone)
        })
        mongoose.connection.close()
    })
}
