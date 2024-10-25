<script setup>
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter()

const email = "1847@qq.com"
const password = "root"
// let email, password
function login() {
    api.users.login(email, password).then(response => {
        if (response.code == 0) {
            alert("登录成功")
            localStorage.setItem("pandora.token", response.data.accessToken)
            router.push('/')
        } else {
            alert(response.message)
        }
    }).catch(error => {
        console.error(error);
    });
}
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <input id="email" type="text" placeholder="Email" v-model="email">
        <input id="password" type="password" placeholder="Password" v-model="password">
        <button @click="login">Login</button>
    </div>
</template>

<style scoped>
.login-container {
    width: 400px;
    height: 250px;
    margin: 100px auto;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    margin-top: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>