import axios from 'axios'


const https = axios.create({
  baseURL: 'https://api-zingmp3-xi.vercel.app'
})


export default https
