import axios from 'axios'
const BASE_URL = '/api/phonebook/'

const getAll = () => {
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}

const createContact = newContact => {
    const request = axios.post(BASE_URL, newContact)
    return request.then(response => response.data)
}

const removeContact = (id) => {
    const request = axios.delete(BASE_URL + id)
    return request.then(response => response.data)
}

const updateContact = (contact, id) => {
    const request = axios.put(BASE_URL + id, contact)
    return request.then(response => response.data)
}

export default {
    getAll,
    createContact,
    removeContact,
    updateContact,
}