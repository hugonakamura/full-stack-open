import axios from 'axios'
const BASE_URL = 'http://localhost:3001/phonebook'

const getAll = () => {
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}

const createPerson = newObject => {
    const request = axios.post(BASE_URL, newObject)
    return request.then(response => response.data)
}

const removePerson = (id) => {
    const request = axios.delete(BASE_URL + '/' + id)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPerson,
    removePerson
}