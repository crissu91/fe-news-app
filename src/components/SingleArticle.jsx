import { useContext, useEffect, useState } from "react"
import { getArticleById, patchArticleById } from "../api"
import { useParams } from "react-router"
import CommentsByArticleId from "./CommentsByArticleId"
import Error from "./Error"
import UserContext from "../contexts/userContext"

function SingleArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [articleVotes, setArticleVotes] = useState(0)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [error, setError] = useState(false)
    const {user} = useContext(UserContext)

    const formattedDate = new Date(article.created_at).toLocaleString();

    useEffect(()=>{
        getArticleById(article_id)
        .then((res) =>{
            setArticle(res[0])
            setIsLoading(false)
        })
        .catch((err) =>{
            setApiError(err)
            setIsLoading(false)
        })
    },[])

    
    function handleClick() {
        setArticleVotes((currentArticleVotes=>{
            setButtonClicked(true)
            return currentArticleVotes + 1;
        }))
        patchArticleById(article_id, 1).catch(()=>{
                setError(true)
                setArticleVotes((currentArticleVotes=>{
                    return currentArticleVotes - 1;
                }))
        })
        setError(false)
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
        <main>
                <h2 className="article-title">{article.title}</h2>
                <img className="article-img-single" src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`}/>
            <ul key={article.article_id} className="single-article">
                <li>Author: {article.author}</li>
                <li>Created at: {formattedDate}</li>
                <li>Comments: {article.comment_count}</li>
                <li>Topic: {article.topic}</li>
                <li>Votes: {article.votes + articleVotes}</li>
            </ul>
            { error ? <p style={{color: 'red'}}>Please try again</p> : null}
                <button aria-label="vote this comment" disabled={buttonClicked || !user} onClick={handleClick}>Vote article</button>
                <p className="article-body">{article.body}</p>
                <CommentsByArticleId />
        </main>
            )
    }

export default SingleArticle;