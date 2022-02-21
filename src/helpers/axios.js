import axios from 'axios'
// import { ACCESS_TOKEN } from '../utils/constants'

export const baseURL = "http://192.168.0.194:9000/api/v1"

// const accessToken = localStorage.getItem(ACCESS_TOKEN)
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

export default axios.create({
    baseURL,

    // add additional headers
})
