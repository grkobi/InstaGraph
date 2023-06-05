import { ImgUploader } from "./img-uploader";
import { useEffect, useState } from "react";
import { storyService } from "../services/story.service";

export function CreateStory(story) {
    // return <h5 className="create-story">Hello from create</h5>
    const [newStory, SetNewStory] = useState(storyService.getEmptyStory())

    function onUpload(imgUrl) {
        SetNewStory(prevState => ({ ...prevState, imgUrl }))
    }

    useEffect(() => {
        console.log(newStory)
    }, [newStory])

    return (
        <div>
            <ImgUploader story={story} onUpload={onUpload} />
            <h1> Hello from create</h1>
        </div>
    )
}