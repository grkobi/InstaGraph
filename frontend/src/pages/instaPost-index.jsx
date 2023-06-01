import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadInstaPosts, addInstaPost, updateInstaPost, removeInstaPost } from '../store/instaPost.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { instaPostService } from '../services/instaPost.service.js'

export function InstaPostIndex() {

    const instaPosts = useSelector(storeState => storeState.instaPostModule.instaPosts)

    useEffect(() => {
        loadInstaPosts()
    }, [])

    async function onRemoveInstaPost(instaPostId) {
        try {
            await removeInstaPost(instaPostId)
            showSuccessMsg('InstaPost removed')
        } catch (err) {
            showErrorMsg('Cannot remove instaPost')
        }
    }

    async function onAddInstaPost() {
        const instaPost = instaPostService.getEmptyInstaPost()
        instaPost.vendor = prompt('Vendor?')
        try {
            const savedInstaPost = await addInstaPost(instaPost)
            showSuccessMsg(`InstaPost added (id: ${savedInstaPost._id})`)
        } catch (err) {
            showErrorMsg('Cannot add instaPost')
        }
    }

    async function onUpdateInstaPost(instaPost) {
        const price = +prompt('New price?')
        const instaPostToSave = { ...instaPost, price }
        try {
            const savedInstaPost = await updateInstaPost(instaPostToSave)
            showSuccessMsg(`InstaPost updated, new price: ${savedInstaPost.price}`)
        } catch (err) {
            showErrorMsg('Cannot update instaPost')
        }
    }


    function onAddInstaPostMsg(instaPost) {
        console.log(`TODO Adding msg to instaPost`)
    }

    return (
        <div>
            <h3>InstaPosts App</h3>
            <main>
                <button onClick={onAddInstaPost}>Add InstaPost ⛐</button>
                <ul className="instaPost-list">
                    {instaPosts.map(instaPost =>
                        <li className="instaPost-preview" key={instaPost._id}>
                            <h4>{instaPost.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${instaPost.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{instaPost.owner && instaPost.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveInstaPost(instaPost._id) }}>x</button>
                                <button onClick={() => { onUpdateInstaPost(instaPost) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddInstaPostMsg(instaPost) }}>Add instaPost msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}