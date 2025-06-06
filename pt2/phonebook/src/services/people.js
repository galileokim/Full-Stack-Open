import axios from 'axios'
//was previously http://localhost:3001/persons which accessed the json server
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.status == 204)
}

export default { 
  getAll: getAll, 
  create: create, 
  remove: remove
}