

export function LikeBtn({ isLiked, toggleLike }) {


    // return(<a onClick={onClick}><i>{isLiked ?"fa-solid fa-heart" :"fa-regular fa-heart"}</i></a>)

    return (<a onClick={toggleLike}><i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></a>)
}
