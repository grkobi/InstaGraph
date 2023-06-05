import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser
}

window.userService = userService



const user = {
    _id: "u101",
    username: "Muko",
    password: "mukmuk",
    fullname: "Muki Muka",
    imgUrl: "http://some-img",
    following: [
      {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      }
    ],
    followers: [
      {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      }
    ],
    savedStoryIds: ["s104", "s111", "s123"]
  }

  _createUser()

  function _createUser() {
    let users = utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, user)
    }
  }

function getUsers(filterBy = { txt: '' }) {
    //     var users = storageService.query('user').then(users => users)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     users = users.filter(user => {
    //         return regex.test(user.username)
    //     })
    //     // users = users.filter(user => regex.test(user.unername) || regex.test(car.description))
    // }
    // return users
    console.log('get logged in user', storageService.query(STORAGE_KEY_LOGGEDIN_USER))
    return storageService.query(STORAGE_KEY_LOGGEDIN_USER)
    // return httpService.get(`user`)
}

// function filterUsers(filterBy, users) {
//     if (!users.length) return
//     const regex = new RegExp(filterBy.txt, 'i')
//     users = users.filter(user => {
//         return regex.test(user.username)
//     })
//     return users
// }

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_LOGGEDIN_USER, userId)
    console.log('getbyiDDDD')
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({_id, score}) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    // user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    // return user
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    // const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        username: "",
        password: "",
        fullname: "",
        imgUrl: '',
        bio: '',
        following: [],
        followers: [],
        savedStoryIds: []
    }
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



