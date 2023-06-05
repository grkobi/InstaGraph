// const { Link } = ReactRouterDOM
import {Link} from 'react-router-dom'
import { StoryPreview } from "./story-preview.jsx"

export function StoryList({ stories, onRemoveStory}) {
    if(!stories) return <div>No posts at the moment</div>
    return <ul className="story-list grid">
        {stories.map(story =>
            <li key={story._id}>
                <StoryPreview story={story} onRemoveStory={onRemoveStory}/>
                <div className="options">
                    <Link className="btn" to={`/post/details/${story._id}`}></Link>
                    <Link className="btn" to={`/post/edit/${story._id}`}></Link>
                </div>
            </li>)}
    </ul>
}