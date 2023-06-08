export function CreateComment({comment, setComment,onCreateComment}) {

    function handleChange({ target }) {
console.log('bla')
    }

    return (

        <form onSubmit={onCreateComment}><input type="txt"  onChange={handleChange} aria-label="Add a comment…" placeholder="Add a comment…" style={{ height: '22px', width: '29em', resize: 'none' }} ></input></form>

        // <div><button onClick={onCreateComment()}>Add comment</button><input></input></div>
    )
}