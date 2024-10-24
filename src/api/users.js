import request from '../utils/request'

function login(email, password) {
    return request({
        method: "POST",
        url: "/users/login",
        data: {
            "email": email,
            "password": password,
        }
    })
}

function register(email, password, confirmPassword) {
    return request({
        method: "POST",
        url: "/users/register",
        data: {
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
        }
    })
}

function info() {
    return request({
        method: "POST",
        url: "/users/info"
    })
}

export default {
    login, register, info
}