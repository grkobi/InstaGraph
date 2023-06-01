// const { useSelector, useDispatch } = ReactRedux
// const { useState } = React

import { useSelector, useDispatch } from 'react-redux'
// import { useState } from 'React'
import { UPDATE_INSTAPOST } from '../store/instaPost.reducer.js'
// import { saveInstaPost } from '../store/instaPost.actions.js'
import { Link } from 'react-router-dom'


export function InstaPostPreview({ instaPost, progressPrecent }) {
    const dispatch = useDispatch()
    const instaPosts = useSelector((storeState) => storeState.instaPost)


    function handleChange(ev) {
        const val = ev.target.checked
        instaPost.isDone = !instaPost.isDone
        dispatch({ type: UPDATE_INSTAPOST, instaPost })
        console.log('from change:::: ', instaPosts);
        // saveInstaPost(instaPost).then(() => {

        //     progressPrecent()
        // })
    }

    return <div className="todo-txt">
        <img src={instaPost.imgUrl}></img>
        <h1>{instaPost.txt}</h1>
    </div>
}