import { useContext, useState } from "react";
import { postCommentByArticleId } from "../api";
import { useParams } from "react-router";
import Error from "./Error";
import UserContext from "../contexts/userContext";

function CommentAdder({ setComments }) {
    const {user} = useContext(UserContext)
    const {article_id} = useParams()
    const [newComment, setNewComment] = useState("")
    const [apiError, setApiError] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();
        postCommentByArticleId(article_id, newComment, user)
        .then((postedComment)=>{
            setComments((currComments)=>{
                return [postedComment, ...currComments]
            })
        })
        .catch((err) =>{
            setApiError(err)
            setIsLoading(false)
        })
        setNewComment("")
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status}
                errorMessage={apiError.response?.data?.msg || 'Oops! Something went wrong. Please try again'}
            />
        )
    }
    return (
        <form className="comment-adder-form" onSubmit={handleSubmit}>
            <label htmlFor="new-comment">Add a comment</label>
            <textarea id="new-comment" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} required placeholder={!user ? 'You need to be logged in to add a comment' : ''}/>
            <button type="submit" disabled={!user}>Add comment</button>
        </form>
    )
}

export default CommentAdder;