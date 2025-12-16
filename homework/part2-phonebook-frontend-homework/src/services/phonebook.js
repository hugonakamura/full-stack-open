import axios from 'axios'
const BASE_URL = '/api/phonebook/'

const getAll = () => {
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}

const createContact = newObject => {
    const request = axios.post(BASE_URL, newObject)
    return request.then(response => response.data)
}

const removeContact = (id) => {
    const request = axios.delete(BASE_URL + id)
    return request.then(response => response.data)
}

export default {
    getAll,
    createContact,
    removeContact
}