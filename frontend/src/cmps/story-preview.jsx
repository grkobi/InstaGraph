// const { useSelector, useDispatch } = ReactRedux
// const { useState } = React

import { useSelector, useDispatch } from 'react-redux'
// import { useState } from 'React'
import { UPDATE_STORY } from '../store/story.reducer.js'
// import { saveStory } from '../store/story.actions.js'
import { Link } from 'react-router-dom'
import { LikeBtn } from './like-btn.jsx'
import {userService} from '../services/user.service.js'

export function StoryPreview({ story, progressPrecent }) {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.users)
    // const stories = useSelector((storeState) => storeState.story)

 const isLiked = story.likedBy.filter((u)=>u._id === user._id).length===1
 const onLiked = (()=>  true)

        function handleChange(ev) {
            const val = ev.target.checked
            story.isDone = !story.isDone
            dispatch({ type: UPDATE_STORY, story })
            // console.log('from change:::: ', stories);
            // savestory(story).then(() => {

            //     progressPrecent()
            // })
        }

    return <div className="story-preview">
        {/* {console.log("steph curry", story)} */}
        <img src={story.imgUrl}></img>
        <h5>{story.txt}</h5>
        <LikeBtn onClick={onLiked} isLiked={isLiked} />
    </div >
}