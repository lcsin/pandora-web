import request from '../utils/request'

function getMusicList() {
    return request({
        method: "POST",
        url: "/music/list"
    })
}

export default { getMusicList }
