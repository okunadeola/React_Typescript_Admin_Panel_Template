
import axios from 'axios'

const API = axios.create({ baseURL: `https://jsonplaceholder.typicode.com` })

API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer token...`
    req.headers['Content-type'] = 'application/json'
    req.headers["Accept"] = 'application/json'

    //   req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('ems_auth_token'))}`      
  return req
})
export default API
