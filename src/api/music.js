import request from '../utils/request'

function getMusicList() {
    return request({
        method: "POST",
        url: "/music/list"
    })
}

function searchMusic(query) {
    return request({
        method: "POST",
        url: "/music/search",
        data: {
            "query": query
        }
    })
}

function uploadMusic(fileList) {
    return request({
        method: "POST",
        url: "/music/upload",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            "file": fileList
        }
    })
}

function deleteMuisc(ID) {
    return request({
        method: "POST",
        url: "/music/delete",
        data: {
            "id": ID
        }
    })
}

function updateMusic(ID, name, author) {
    return request({
        method: "POST",
        url: "/music/update",
        data: {
            "id": ID,
            "name": name,
            "author": author
        }
    })
}

export default { getMusicList, searchMusic, uploadMusic, deleteMuisc, updateMusic }
