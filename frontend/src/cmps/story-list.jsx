// const { Link } = ReactRouterDOM
import {Link} from 'react-router-dom'
import { StoryPreview } from "./story-preview.jsx"

export function StoryList({ stories, onRemoveStory}) {
    if(!stories) return <div>No posts at the moment</div>
    return <ul className="story-list grid">
        {stories.map(story =>
            <li key={story._id}>
                <StoryPreview story={story}/>
                <div className="options">
                    <Link className="btn" to={`/post/details/${story._id}`}><i className="fa-solid fa-info"></i></Link>
                    <Link className="btn" to={`/post/edit/${story._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button className="btn" onClick={() => { onRemoveStory(story._id) }}><i className="fa-solid fa-trash-can">Remove post</i></button>
                </div>
            </li>)}
    </ul>
}