import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../api";
import { useParams } from "react-router";

function CommentsByArticleId() {
    const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getCommentsByArticleId(article_id)
        .then((res)=>{
            setComments(res)
            setIsLoading(false)
        })
        .catch(console.log)
    }, [])

    return (
        <div className="comment">
            <h2 className="comments-header">Comments:</h2>
            {!comments.length ? <p>No comments for this article</p> : <ul>{comments.map(({comment_id, body, author, created_at, votes}) => (
                <li key={comment_id}>
                    <p className="comment-body">{body}</p>
                    <p className="comment-author">Author: {author}</p>
                    <p className="comment-created-at">Created at: {created_at}</p>
                    <p className="comment-votes">Votes: {votes}</p>
                </li>
                ))}
            </ul>}
        </div>
    )
}
export default CommentsByArticleId;