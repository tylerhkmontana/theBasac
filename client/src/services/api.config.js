import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 7000
})

export default api