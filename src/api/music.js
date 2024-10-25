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

export default { getMusicList, searchMusic }
