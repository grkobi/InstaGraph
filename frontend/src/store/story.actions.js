// import { storyService } from "../services/story.service.local.js";
import { storyService } from "../services/story.service.mock.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, UNDO_REMOVE_STORY, UPDATE_STORY, TOGGLE_LIKE } from "./story.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
export function getActionAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

export async function toggleLike(story, user) {
    try {
        // console.log('storyid', storyId)
        await storyService.saveToggleLike(story, user)
        store.dispatch({
            type: TOGGLE_LIKE, payload: { story, user }
        })
    } catch (err) {
        console.log('Cannot add like', err)
        throw err
    }
}

// return {
//     type: TOGGLE_LIKE,
//     payload: {
//         storyId,
//         user
//     }
// }


export async function loadStories() {
    try {
        const stories = await storyService.query()
        // console.log('Stories from DB:', stories)
        store.dispatch({
            type: SET_STORIES,
            stories
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }

}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export function updateStory(story) {
    return storyService.save(story)
        .then(savedStory => {
            console.log('Updated Story:', savedStory)
            store.dispatch(getActionUpdateStory(savedStory))
            return savedStory
        })
        .catch(err => {
            console.log('Cannot save story', err)
            throw err
        })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStoryOptimistic(storyId) {
    store.dispatch({
        type: REMOVE_STORY,
        storyId
    })
    showSuccessMsg('Story removed')

    storyService.remove(storyId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove story')
            console.log('Cannot load stories', err)
            store.dispatch({
                type: UNDO_REMOVE_STORY,
            })
        })
}
