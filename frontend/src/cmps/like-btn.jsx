

export function LikeBtn({ isLiked, onClick }) {


    return (<button onClick={onClick}>{isLiked ? 'Liked' : 'Like'}</button>)

}