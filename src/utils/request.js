import axios from 'axios'
import config from '../config/config'

const request = axios.create({
    baseURL: config.baseURL + "api/v1",
    headers: { "Authorization": localStorage.getItem("pandora.token") },
})

export default request