import axios from 'axios'

const api = axios.create({
  baseURL: 'https://3333-be8f4bf6-1b4c-476e-a0b7-5d0afee59d06.ws-us02.gitpod.io/v1'
  // baseURL: 'http://192.168.227.2:3333/v1'
})

export default api
