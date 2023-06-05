import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { storyService } from '../services/story.service.js'

export function StoryIndex() {

    const story = useSelector(storeState => storeState.storyModule.story)

    useEffect(() => {
        loadStories()
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onAddStory() {
        const story = storyService.getEmptyStory()
        story.vendor = prompt('Vendor?')
        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
    }

    async function onUpdateStory(story) {
        const price = +prompt('New price?')
        const storyToSave = { ...story, price }
        try {
            const savedStory = await updateStory(storyToSave)
            showSuccessMsg(`Story updated, new price: ${savedStory.price}`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }
    }


    function onAddStoryMsg(story) {
        console.log(`TODO Adding msg to story`)
    }

    return (
        <div>
            <h3>Stories App</h3>
            <main>
                <button onClick={onAddStory}>Add Story </button>
                <ul className="story-list">
                    {story.map(story =>
                        <li key={story._id}>
                            {/* <h4>{story.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${story.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{story.owner && story.owner.fullname}</span></p> */}
                            <div>
                                <button onClick={() => { onRemoveStory(story._id) }}>x</button>
                                <button onClick={() => { onUpdateStory(story) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddStoryMsg(story) }}>Add story msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}