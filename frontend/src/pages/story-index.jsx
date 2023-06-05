import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories, addStory, updateStory, removeStory } from '../store/story.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { storyService } from '../services/story.service.js'
import { StoryList } from '../cmps/story-list.jsx'
import { loadUsers } from '../store/user.actions.js';

export function HomePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    useEffect(() => {
        loadStories()
        loadUsers()
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('story removed')
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
            <main>
                <div className='content'>
                    <StoryList stories={stories} onRemoveStory={onRemoveStory} />
                </div>
            </main>
{/* 
            <div className='suggestions'>
                        <li>Puki</li>
                        <li>John</li>
                        <li>Muki</li>
                    </div> */}
                </div>
    )
}