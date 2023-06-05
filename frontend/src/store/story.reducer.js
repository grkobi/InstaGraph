export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'

const initialState = {
    stories: [],
    // instaPostt: [],
    lastRemovedInstaPost: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case REMOVE_STORY:
            const lastRemovedInstaPost = state.stories.find(story => story._id === action.storyId)
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories, lastRemovedInstaPost }
            break
        case ADD_STORY:
            newState = { ...state, stories: [...state.stories, action.story] }
            break
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, stories }
            break
        case UNDO_REMOVE_STORY:
            if (state.lastRemovedStory) {
                newState = { ...state, stories: [...state.stories, state.lastRemovedInstaPost], lastRemovedInstaPost: null }
            }
            break
        case TOGGLE_LIKE:
            const user = action.payload.user
            const storyId = action.payload.storyId
            const storyIndex = state.stories.findIndex((story) => story._id === storyId)
            const currentLikes = state.stories[storyIndex].likedBy
            const isLiked = currentLikes.some((u) => u._id === user._id)
            const likedBy = isLiked ? currentLikes.filter((u) => u._id !== user._id) : [...currentLikes, user]
            const story = { ...state.stories[storyIndex], likedBy }
            newState = {
                ...state,
                stories: [
                    ...state.stories.slice(0, storyIndex),
                    story,
                    ...state.stories.slice(storyIndex+1)
                ]
            }
            break
        default:
    }
    return newState
}
