import axios from 'axios'
import { RemoveLocal, getAccessToken, getProfile } from '~/helper/localstore'
const https = axios.create({
  baseURL: 'https://api-kaito-music.vercel.app/api'
})
let access_token = getAccessToken()
let profile = getProfile()
https.interceptors.request.use(
  function (config) {
    if (access_token) {
      config.headers.authorization = access_token
    }
 
    return config
  },
  function (error) {

    return Promise.reject(error)
  }
)

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    
    if (response.config.url === '/account/login' || response.config.url === '/account/register') {
      access_token = response.data.access_token
      profile = response.data.data
      console.log(response)
    } else if (response.config.url === '/account/logout') {
      access_token = ''
      RemoveLocal()
    }
   
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default https
