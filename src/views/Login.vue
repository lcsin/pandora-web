<script setup>
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <input id="email" type="text" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <button onclick="login()">Login</button>
    </div>
</template>

<style scoped>
.login-container {
    width: 300px;
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