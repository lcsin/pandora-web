<script setup>
import { onMounted, ref } from 'vue';
import api from '../api';
import config from '../config/config';

onMounted(() => {
    getMusicList()
})

// 获取音乐列表
let musicList = ref([])
let playList = ref([])
function getMusicList() {
    api.music.getMusicList().then(response => {
        if (response.data.code == 0) {
            musicList.value = response.data.data
            playList.value = response.data.data.map(item => ({ title: item.name + " - " + item.author, url: config.baseURL + item.url }))
        }
    }).catch(error => {
        console.log(error)
    })
}

// 搜索音乐
let queryMusic = ref('')
function searchMusic() {
    api.music.searchMusic(queryMusic.value).then(response => {
        if (response.data.code == 0) {
            musicList.value = response.data.data
            playList.value = response.data.data.map(item => ({ title: item.name + " - " + item.author, url: config.baseURL + item.url }))
        }
    })
}

// 音乐播放功能
const audioPlayer = ref(null)
const playPauseButton = ref(null)
const prevButton = ref(null);
const nextButton = ref(null);
const progressBar = ref(null);
const progress = ref(null);
const timeDisplay = ref(null);
const currentSongDisplay = ref(null);

let currentTrack = 0;
function loadTrack(trackIndex) {
    if (trackIndex >= 0 && trackIndex < playList.value.length) {
        currentTrack = trackIndex;
        audioPlayer.value.src = playList.value[currentTrack].url;
        currentSongDisplay.value.textContent = playList.value[currentTrack].title;
        audioPlayer.value.play();
        playPauseButton.value.textContent = "⏸️";
    }
}

function playMusic() {
    if (audioPlayer.value.paused) {
        audioPlayer.value.play();
        playPauseButton.value.textContent = "⏸️";
    } else {
        audioPlayer.value.pause();
        playPauseButton.value.textContent = "▶️";
    }
}

function playPrevMusic() {
    loadTrack(currentTrack - 1);
}

function playNextMusic() {
    loadTrack(currentTrack + 1);
}

function playProgressMusic() {
    const clickPosition = (e.pageX - progressBar.value.offsetLeft) / progressBar.value.offsetWidth;
    audioPlayer.value.currentTime = clickPosition * audioPlayer.value.duration;
}

function musicPlaying() {
    const currentTime = audioPlayer.value.currentTime;
    const duration = audioPlayer.value.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.value.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    timeDisplay.value.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

function musicEnded() {
    loadTrack(currentTrack + 1);
}

function playDbClickMusic(idx) {
    loadTrack(idx)
}

// 分割线拖动功能
// let isDragging = false;
// function clickDrag() {
//     isDragging = true;
//     document.addEventListener('mousemove', drag);
//     document.addEventListener('mouseup', stopDrag);
// }
// function drag(e) {
//     if (isDragging) {
//         const containerWidth = document.body.clientWidth;
//         const newWidth = e.clientX;
//         const sidebar = document.getElementById('sidebar')

//         if (newWidth >= 200 && newWidth <= containerWidth / 2) {
//             sidebar.style.width = newWidth + 'px';
//         }
//     }
// }
// function stopDrag() {
//     isDragging = false;
//     document.removeEventListener('mousemove', drag);
//     document.removeEventListener('mouseup', stopDrag);
// }
</script>

<template>
    <div class="sidebar" id="sidebar">
        <h1>Pandora</h1>
        <ul>
            <li @click="getMusicList">💖 我的音乐</li>
            <li>🎐 上传音乐</li>
        </ul>
    </div>
    <div class="divider" id="divider" @mousedown="clickDrag"></div>
    <div class="main-content">
        <div class="search-bar">
            <input type="text" placeholder="搜索音乐..." @keyup.enter="searchMusic" v-model="queryMusic">
        </div>
        <div class="song-list">
            <table>
                <tbody>
                    <tr>
                        <th>歌曲</th>
                        <th>歌手</th>
                        <th>时长</th>
                    </tr>
                    <tr v-for="(v, idx) in musicList" @dblclick="playDbClickMusic(idx)">
                        <td>{{ v.name }}</td>
                        <td>{{ v.author }}</td>
                        <td>{{ v.time }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="player">
            <div class="now-playing">
                <strong>正在播放：</strong>
                <span id="current-song" ref="currentSongDisplay"> 未选择歌曲</span>
                <div class="progress-bar" id="progress-bar" ref="progressBar" @click="playProgressMusic">
                    <div class="progress" id="progress" ref="progress"></div>
                </div>
            </div>
            <div class="player-controls">
                <button id="prev-button" ref="prevButton" @click="playPrevMusic">⏮️</button>
                <button id="play-pause-button" @click="playMusic" ref="playPauseButton">▶️</button>
                <button id="next-button" ref="nextButton" @click="playNextMusic">⏭️</button>
            </div>
            <div id="time-display" ref="timeDisplay">0:00 / 0:00</div>
        </div>
    </div>

    <audio id="audio-player" ref="audioPlayer" @timeupdate="musicPlaying" @ended="musicEnded"></audio>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.sidebar {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    overflow-y: auto;
    min-width: 200px;
    max-width: 50%;
}

.divider {
    width: 5px;
    background-color: #34495e;
    cursor: col-resize;
}

.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-width: 400px;
}

.search-bar {
    padding: 20px;
    background-color: #34495e;
}

.song-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
}

.player {
    height: 100px;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h1 {
    margin-bottom: 20px;
    font-size: 30px;
    color: #3498db;
}

ul {
    list-style-type: none;
}

li {
    padding: 10px 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

li:hover {
    background-color: #34495e;
    padding-left: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ecf0f1;
}

th {
    background-color: #3498db;
    color: #fff;
}

tr:hover {
    background-color: #f5f5f5;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 20px;
    background-color: #ecf0f1;
    color: #2c3e50;
}

button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: #2980b9;
}

.player-controls {
    display: flex;
    gap: 10px;
}

.now-playing {
    font-size: 14px;
    flex-grow: 1;
}

.progress-bar {
    width: 100%;
    background-color: #34495e;
    height: 5px;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
    cursor: pointer;
}

.progress {
    width: 0%;
    height: 100%;
    background-color: #3498db;
    transition: width 0.1s linear;
}
</style>