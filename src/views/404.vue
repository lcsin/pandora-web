<script setup>
</script>

<template>
    <div class="container">
        <i class="error-icon">&#x1F63F;</i>
        <h1>哎呀！页面迷路了。</h1>
        <p>很抱歉，你要找的页面似乎去探险了，暂时找不到它的踪迹。请检查你输入的网址是否正确，或者返回首页重新开始你的旅程。</p>
        <a href="/">返回首页</a>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.error-icon {
    font-size: 64px;
    color: #388e3c;
}

h1 {
    color: #2e7d32;
    font-size: 40px;
    margin-top: 20px;
}

p {
    color: #43a047;
    font-size: 18px;
    margin-top: 10px;
    max-width: 600px;
    text-align: center;
}

a {
    background-color: #66bb6a;
    color: white;
    padding: 15px 30px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 20px;
    margin-top: 30px;
}
</style>