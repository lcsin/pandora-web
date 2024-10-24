<script setup>
</script>

<template>
    <div class="registration-container">
        <h2>Register</h2>
        <input id="email" type="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <input id="confirmPassword" type="password" placeholder="Confirm Password">
        <button onclick="register()">Register</button>
    </div>
</template>

<style scoped>
.registration-container {
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
input[type="email"],
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