// const { useSelector, useDispatch } = ReactRedux
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { storyService } from "../services/story.service.mock.js";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import { UPDATE_STORY } from '../store/story.reducer.js'
// import { saveStory } from '../store/story.actions.js'
import { Link } from 'react-router-dom'
import { LikeBtn } from './like-btn.jsx'
import { userService } from '../services/user.service.js'
import { useCallback } from 'react'
import { toggleLike } from '../store/story.actions.js'
import { CreateComment } from './create-comment.jsx'


export function StoryPreview({ story, onRemoveStory }) {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.user)
    const [comment, setComment] = useState({ txt: '' })
    // const stories = useSelector((storeState) => storeState.story)

    const isLiked = story.likedBy.some((u) => u._id === user._id)

    const onToggleLike = useCallback(() => {
        toggleLike(story, user)
    }, [story, user])


    function handleChange(ev) {
        const val = ev.target.checked
        story.isDone = !story.isDone
        dispatch({ type: UPDATE_STORY, story })
    }

    function onCreateComment(txt, ev) {
        ev.preventDefault()
        // console.log('sssssasdasdas', txt)
        // return true
    }

    return (
        <div className="story-preview">
            <section className="story-header">
                <div className="header-info">
                    {/* {console.log("steph curry", story)} */}
                    <img className="user-img" src={story.by.imgUrl} />
                    <span className="username-story">{story.by.fullname}</span>
                    <button className="btn" onClick={() => { onRemoveStory(story._id) }}>
                        <svg aria-label="More options" className='story-actions' color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="20">
                            <circle cx="6" cy="12" r="1.5"></circle>
                            <circle cx="12" cy="12" r="1.5"></circle>
                            <circle cx="18" cy="12" r="1.5"></circle>
                        </svg>
                    </button>
                </div>
            </section>
            <img src={story.imgUrl}></img>
            <div className="btn-container">
            </div>
            <section className="story-footer">
                <LikeBtn className="like-btn" toggleLike={onToggleLike} isLiked={isLiked} />
                <CreateComment setComment={setComment} createComment={onCreateComment} />
                <div><span className='username-footer'>{story.by.fullname}&nbsp;</span> <span className='txt-footer'> {story.txt}</span></div>
            </section>
        </div >)
}