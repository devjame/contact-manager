import axios from 'axios'

const URL = import.meta.API_URL
export default axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})
