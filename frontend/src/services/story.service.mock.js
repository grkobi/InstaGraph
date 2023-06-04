
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStories,
    addStoriesMsg
}
window.cs = storyService

const story = [{  _id: "s101",
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
tags: ["fun", "romantic"]},

{  _id: "s102",
txt: "Antigua, Guatemala",
imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbKsAnyOq3KP3vD_fBZEoHrDSjoUKhnJYvHA&usqp=CAU", 
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
    id: "c1002",
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
tags: ["fun", "romantic"]
}
]
_createStory()


async function query() {
  return storageService.query(STORAGE_KEY)
    // return [story]
}

function _createStory() {
  let stories = utilService.loadFromStorage(STORAGE_KEY)
  if (!stories || !stories.length) {
      utilService.saveToStorage(STORAGE_KEY, story)
  }
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStories
    if (story._id) {
        savedStories = await httpService.put(`story/${story._id}`, story)

    } else {
        savedStories = await httpService.post('story', story)
    }
    return savedStories
}

async function addStoriesMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}


function getEmptyStories() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





