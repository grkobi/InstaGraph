
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'instaPost'

export const instaPostService = {
    query,
    getById,
    save,
    remove,
    getEmptyInstaPost,
    addInstaPostMsg
}
window.cs = instaPostService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(instaPostId) {
    return httpService.get(`instaPost/${instaPostId}`)
}

async function remove(instaPostId) {
    return httpService.delete(`instaPost/${instaPostId}`)
}
async function save(instaPost) {
    var savedInstaPost
    if (instaPost._id) {
        savedInstaPost = await httpService.put(`instaPost/${instaPost._id}`, instaPost)

    } else {
        savedInstaPost = await httpService.post('instaPost', instaPost)
    }
    return savedInstaPost
}

async function addInstaPostMsg(instaPostId, txt) {
    const savedMsg = await httpService.post(`instaPost/${instaPostId}/msg`, { txt })
    return savedMsg
}


function getEmptyInstaPost() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





