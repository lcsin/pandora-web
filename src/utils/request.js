import axios from 'axios'
import config from '../config/config'

const request = axios.create({
    baseURL: config.baseURL + "api/v1",
})

request.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem("pandora.token")
    return config
})

request.interceptors.response.use(response => {
    if (response.status == 200) {
        return response.data
    }
    return
})

export default request