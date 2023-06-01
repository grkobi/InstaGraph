
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

const story = {  _id: "s101",
txt: "Steph Curry",
imgUrl: "https://cdn.vox-cdn.com/thumbor/FrEVUUm1BKT_TKJJ8VaDhLlGKHI=/0x0:4800x3300/1200x800/filters:focal(1954x620:2722x1388)/cdn.vox-cdn.com/uploads/chorus_image/image/71925558/1460384746.0.jpg", 
by: {
  _id: "u101",
  fullname: "Ulash Ulashi",
  imgUrl: "http://some-img"
},
loc: { // Optional
  lat: 11.11, 
  lng: 22.22,
  name: "Tel Aviv"
},
comments: [
  {
    id: "c1001",
    by: {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img"
    },
    txt: "good one!",
    likedBy: [ // Optional
      {
        "_id": "u105",
        "fullname": "Bob",
        "imgUrl": "http://some-img"
      }
    ]
  },
  {
    id: "c1002",
    by: {
      _id: "u106",
      fullname: "Dob",
      imgUrl: "http://some-img"
    },
    txt: "not good!",
  }
],
likedBy: [
  {
    _id: "u105",
    fullname: "Bob",
    imgUrl: "http://some-img"
  },
  {
    _id: "u106",
    fullname: "Dob",
    imgUrl: "http://some-img"
  }
],
tags: ["fun", "romantic"]}


async function query(filterBy = { txt: '', price: 0 }) {
    return [story]
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





