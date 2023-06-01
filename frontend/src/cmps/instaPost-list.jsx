// const { Link } = ReactRouterDOM
import {Link} from 'react-router-dom'
import { InstaPostPreview } from "./instaPost-preview.jsx"

export function InstaPostList({ instaPosts, onRemoveInstaPost}) {
    if(!instaPosts) return <div>No posts at the moment</div>
    return <ul className="todo-list">
        {instaPosts.map(instaPost =>
            <li className="todo-preview" key={instaPost._id}>
                <InstaPostPreview instaPost={instaPost}/>
                <div className="options">
                    <Link className="btn" to={`/post/details/${instaPost._id}`}><i className="fa-solid fa-info"></i></Link>
                    <Link className="btn" to={`/post/edit/${instaPost._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button className="btn" onClick={() => { onRemoveInstaPost(instaPost._id) }}><i className="fa-solid fa-trash-can"></i></button>
                </div>
            </li>)}
    </ul>
}