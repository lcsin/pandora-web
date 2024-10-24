import axios from 'axios'

const request = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: { "Authorization": localStorage.getItem("token") },
})

export default request