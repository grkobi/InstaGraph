
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
  addStoriesMsg,
  saveToggleLike,
  createComment
}
window.cs = storyService

const story = [{
  _id: "s101",
  txt: "The almighty Steph Curry1111",
  imgUrl: "https://cdn.vox-cdn.com/thumbor/FrEVUUm1BKT_TKJJ8VaDhLlGKHI=/0x0:4800x3300/1200x800/filters:focal(1954x620:2722x1388)/cdn.vox-cdn.com/uploads/chorus_image/image/71925558/1460384746.0.jpg",
  by: {
    _id: "u101",
    fullname: "Ulash Ulashi",
    imgUrl: "https://www.apetogentleman.com/wp-content/uploads/2018/06/top-male-models.jpg"
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
  tags: ["fun", "romantic"]
},

{
  _id: "s102",
  txt: "Antigua, Guatemala",
  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbKsAnyOq3KP3vD_fBZEoHrDSjoUKhnJYvHA&usqp=CAU",
  by: {
    _id: "u101",
    fullname: "Muki Puki",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtHTppnHblCfpg_T9M0Xu-hlgJLJgasbk0w&usqp=CAU",
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

async function saveToggleLike(story, user) {
  // check inside the story if I am there. If not add the id, if yes then remove
  const isLiked = story.likedBy.some((s) => s._id === story._id)
  const stories = utilService.loadFromStorage(STORAGE_KEY)
  const storyIndex = stories.findIndex((s) => s._id === story._id)
  const likedBy = isLiked ? story.likedBy.filter((u) => u._id !== user._id) : [...story.likedBy, user]
  const newStory = { ...story, likedBy }
  const newStories = [
    ...stories.slice(0, storyIndex),
    newStory,
    ...stories.slice(storyIndex + 1)
  ]
  utilService.saveToStorage(STORAGE_KEY, newStories)
  return newStories
  // console.log('ssssssss', storyId)
  // console.log('userrrr', user)
  // var story = await storageService.put(STORAGE_KEY, story)
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

function createComment(txt, user) {
  return {
    id: _makeId(),
    by: user,
    txt
  }
}

function getEmptyStories() {
  return {
    id: "",
    txt: "",
    imgUrl: "",
    by: {
      _id: "",
      fullname: "",
      imgUrl: ""
    },
  }
}

function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

