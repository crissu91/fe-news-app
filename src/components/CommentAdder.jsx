import { useState } from "react";
import { postCommentByArticleId } from "../api";
import { useParams } from "react-router";

function CommentAdder({ setComments }) {
    const {article_id} = useParams()
    const [newComment, setNewComment] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        postCommentByArticleId(article_id, newComment)
        .then((postedComment)=>{
            setComments((currComments)=>{
                return [postedComment, ...currComments]
            })
        })
        setNewComment("")
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