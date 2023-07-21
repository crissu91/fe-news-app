import { useState } from "react";
import { postCommentByArticleId } from "../api";
import { useParams } from "react-router";
import Error from "./Error";

function CommentAdder({ setComments }) {
    const {article_id} = useParams()
    const [newComment, setNewComment] = useState("")
    const [apiError, setApiError] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();
        postCommentByArticleId(article_id, newComment)
        .then((postedComment)=>{
            setComments((currComments)=>{
                return [postedComment, ...currComments]
            })
        })
        .catch((err) =>{
            setApiError(err)
        })
        setNewComment("")
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status || '503'}
                errorMessage={apiError.response?.data?.msg || 'Please try again'}
            />
        )
    }
        
    return (
        <form className="comment-adder-form" onSubmit={handleSubmit}>
            <label htmlFor="new-comment">Add a comment</label>
            <textarea id="new-comment" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} required/>
            <button type="submit" >Add comment</button>
        </form>
    )
}

export default CommentAdder;