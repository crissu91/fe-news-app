import { useContext, useEffect, useState } from "react";
import { deleteCommentById, getCommentsByArticleId } from "../api";
import { useParams } from "react-router";
import CommentAdder from "./CommentAdder";
import Error from "./Error"
import UserContext from "../contexts/userContext";

function CommentsByArticleId() {
    const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState(null)
    const { user } = useContext(UserContext)
    const [commentDeleted, setCommentDeleted] = useState(null)

    useEffect(()=>{
        getCommentsByArticleId(article_id)
        .then((res)=>{
            setComments(res)
            setIsLoading(false)
        })
        .catch((err) =>{
            setApiError(err)
        })
    }, [])

    const handleDeleteClick = (comment_id) => {
            deleteCommentById(comment_id)
            .then(()=>{
                setIsLoading(false)
                setCommentDeleted(comment_id)
                setTimeout(() => {
                    setCommentDeleted(null)
                    setComments(res => res.filter(comment => comment.comment_id !== comment_id))
                }, 1000)
            })
            .catch((err) =>{
                setApiError(err)
            })
    }

    if (isLoading) {
        return <p>Loading...</p>
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
      <section className="comment">
        <h2 className="comments-header">Comments:</h2>
        <CommentAdder setComments={setComments} />
        {!comments.length ? (
          <p>No comments for this article</p>
        ) : (
          <ul>
            {comments.map(({ comment_id, body, author, created_at, votes }) => 
                commentDeleted === comment_id ? (
                  <p className="comment-deleted">Comment deleted</p>
                ) : (
                  <li key={comment_id}>
                    <p className="comment-body">{body}</p>
                    <p className="comment-author">Author: {author}</p>
                    <p className="comment-created-at">
                      Created at: {created_at}
                    </p>
                    <p className="comment-votes">Votes: {votes}</p>
                    {user === author ? (
                      <button onClick={() => handleDeleteClick(comment_id)}>
                        Delete comment
                      </button>
                    ) : null}
                  </li>
                )
            )}
          </ul>
        )}
      </section>
    );
}
export default CommentsByArticleId;