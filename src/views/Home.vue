<script setup>
import { onMounted, ref } from 'vue';
import api from '../api';
import config from '../config/config';
import tools from '../utils/tools';

onMounted(() => {
    getMusicList()
})

// 获取音乐列表
let musicList = ref([])
let playList = ref([])
function getMusicList() {
    api.music.getMusicList().then(response => {
        if (response.code == 0) {
            musicList.value = response.data
            playList.value = response.data.map(item => ({ title: item.name + " - " + item.author, url: config.baseURL + item.url }))
        } else {
            tools.NotifyError(response.message)
        }
    })
}

// 搜索音乐
let queryMusic = ref('')
function searchMusic() {
    api.music.searchMusic(queryMusic.value).then(response => {
        if (response.code == 0) {
            musicList.value = response.data
            playList.value = response.data.map(item => ({ title: item.name + " - " + item.author, url: config.baseURL + item.url }))
        } else {
            tools.NotifyError(response.message)
        }
    })
}

// 上传音乐
const dialogVisible = ref(false)
const uploadButton = ref(null)
const fileList = ref([])

function cancelUpload() {
    dialogVisible.value = false
    fileList.value = []
}

function confirmUpload() {
    api.music.uploadMusic(fileList.value).then(response => {
        if (response.code == 0) {
            tools.NotifySuccess('上传成功')
            dialogVisible.value = false
            getMusicList()
        } else {
            alert("上传失败")
            tools.NotifyError(response.message)
        }
    })
}

// 音乐播放功能
const audioPlayer = ref(null)
const playPauseButton = ref(null)
const playPauseButtonText = ref(null)
const prevButton = ref(null);
const nextButton = ref(null);
const progressBar = ref(null);
const progress = ref(null);
const timeDisplay = ref(null);
const currentSongDisplay = ref(null);

let currentTrack = ref(0);
let randFlag = ref(false)
function loadTrack(trackIndex) {
    if (trackIndex >= 0 && trackIndex < playList.value.length) {
        currentTrack = trackIndex;
        audioPlayer.value.src = playList.value[currentTrack].url;
        currentSongDisplay.value.textContent = playList.value[currentTrack].title;
        audioPlayer.value.play();
        playPauseButtonText.value.textContent = "⏸️";
    }
}

function playMusic() {
    if (audioPlayer.value.paused) {
        audioPlayer.value.play();
        playPauseButtonText.value.textContent = "⏸️";
    } else {
        audioPlayer.value.pause();
        playPauseButtonText.value.textContent = "▶️";
    }
}

function playRandMusic() {
    randFlag.value = true
    currentTrack = Math.floor(Math.random() * playList.value.length)
    loadTrack(currentTrack)
}

function playPrevMusic() {
    loadTrack(currentTrack - 1);
}

function playNextMusic() {
    loadTrack(currentTrack + 1);
}

function playProgressMusic(e) {
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
    if (randFlag) {
        currentTrack = Math.floor(Math.random() * playList.value.length)
        loadTrack(currentTrack)
    } else {
        loadTrack(currentTrack + 1);
    }
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
    <!-- 侧边栏 -->
    <div class="sidebar" id="sidebar">
        <h1>Pandora</h1>
        <ul>
            <li @click="getMusicList">💖 我的音乐</li>
        </ul>
    </div>
    <div class="divider" id="divider" @mousedown="clickDrag"></div>

    <!-- 音乐列表主体 -->
    <div class="main-content">
        <div class="search-bar">
            <el-input v-model="queryMusic" placeholder="搜索音乐..." clearable @keyup.enter="searchMusic" />
        </div>
        <div class="song-list">
            <!-- <el-table :data="musicList" style="width: 100%" @row-dblclick="playDbClickMusic">
                <el-table-column prop="name" label="歌曲" />
                <el-table-column prop="author" label="歌手" />
                <el-table-column prop="address" label="操作" />
            </el-table> -->

            <table>
                <tbody>
                    <tr>
                        <th>歌曲</th>
                        <th>歌手</th>
                        <!-- <th>时长</th> -->
                    </tr>
                    <tr v-for="(v, idx) in musicList" @dblclick="playDbClickMusic(idx)">
                        <td>{{ v.name }}</td>
                        <td>{{ v.author }}</td>
                        <!-- <td>{{ v.time }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="player">
            <div class="progress-bar" id="progress-bar" ref="progressBar" @click="playProgressMusic">
                <div class="progress" id="progress" ref="progress"></div>
            </div>
            <div class="playing-info">
                <div class="now-playing">
                    <strong>正在播放：</strong>
                    <span id="current-song" ref="currentSongDisplay"> 未选择歌曲</span>
                </div>
                <div class="player-controls">
                    <el-tooltip content="上传音乐" effect="light">
                        <el-button id="upload-button" ref="uploadButton" @click="dialogVisible = true" text>
                            <span class="playing-icon">⏏️</span>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="播放方式" effect="light">
                        <el-button id="rand-button" ref="randButton" @click="playRandMusic" text>
                            <span class="playing-icon">🔀</span>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="上一首" effect="light">
                        <el-button id="prev-button" ref="prevButton" @click="playPrevMusic" text>
                            <span class="playing-icon">⬅️</span>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="播放/暂停" effect="light">
                        <el-button id="play-pause-button" @click="playMusic" ref="playPauseButton" text>
                            <span class="playing-icon" ref="playPauseButtonText">▶️</span>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="下一首" effect="light">
                        <el-button id="next-button" ref="nextButton" @click="playNextMusic" text>
                            <span class="playing-icon">➡️</span>
                        </el-button>
                    </el-tooltip>
                </div>
                <div>
                    <div class="playing-time" id="time-display" ref="timeDisplay">0:00 / 0:00</div>
                </div>
            </div>
        </div>
    </div>

    <audio id="audio-player" ref="audioPlayer" @timeupdate="musicPlaying" @ended="musicEnded"></audio>

    <!-- 上传音乐dialog -->
    <el-dialog v-model="dialogVisible" title="上传音乐" width="500" :before-close="cancelUpload">
        <span>⚠️ 上传音乐时，文件名称应遵循格式：歌曲名 - 作者名。</span>
        <br><br>
        <el-upload v-model:file-list="fileList" multiple :auto-upload="false">
            <el-button type="primary">Click to upload</el-button>
        </el-upload>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelUpload">Cancel</el-button>
                <el-button type="primary" @click="confirmUpload">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

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
    height: 80px;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    /* display: flex; */
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
    padding-left: 0;
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

/* input[type="text"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 20px;
    background-color: #ecf0f1;
    color: #2c3e50;
} */

/* button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
} */

/* button:hover {
    background-color: #2980b9;
} */

.playing-icon {
    font-size: 20px;
}

.playing-info {
    display: flex;
}

.player-controls {
    display: flex;
    /* gap: 10px; */
    padding-top: 12px;
    padding-right: 20px;
}

.player-controls button {
    padding: 0;
}

.now-playing {
    font-size: 14px;
    flex-grow: 1;
    padding-top: 15px;
}

.progress-bar {
    width: 100%;
    background-color: #34495e;
    height: 5px;
    border-radius: 5px;
    overflow: hidden;
    /* margin-top: 10px; */
    cursor: pointer;
}

.progress {
    width: 0%;
    height: 100%;
    background-color: #3498db;
    transition: width 0.1s linear;
}

.playing-time {
    padding-top: 15px;
}
</style>