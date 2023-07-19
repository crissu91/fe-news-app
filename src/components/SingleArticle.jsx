import { useEffect, useState } from "react"
import { getArticleById, patchArticleById } from "../api"
import { useParams } from "react-router"
import CommentsByArticleId from "./CommentsByArticleId"
import Error from "./Error"

function SingleArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [articleVotes, setArticleVotes] = useState(0)
    const [apiError, setApiError] = useState(null)

    const formattedDate = new Date(article.created_at).toLocaleString();

    useEffect(()=>{
        getArticleById(article_id)
        .then((res) =>{
            setArticle(res[0])
            setIsLoading(false)
        })
        .catch((err) =>{
            setApiError(err)
        })
    },[])

    
    function handleClick() {
        setArticleVotes((currentArticleVotes=>{
            return currentArticleVotes + 1;
        }))
        patchArticleById(article_id, 1).catch((err)=>{
            setApiError(err)
            setArticleVotes((currentArticleVotes=>{
                return currentArticleVotes - 1;
            }))
        })
    }
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status || '599'}
                errorMessage={apiError.response?.data?.msg || 'Please try again'}
            />
        )
    } 

    return (
        <div>
                <h2 className="article-title">{article.title}</h2>
                <img className="article-img-single" src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`}/>
            <ul key={article.article_id} className="single-article">
                <li>Author: {article.author}</li>
                <li>Created at: {formattedDate}</li>
                <li>Comments: {article.comment_count}</li>
                <li>Topic: {article.topic}</li>
                <li>Votes: {article.votes + articleVotes}</li>
            </ul>
                <button aria-label="vote this comment" onClick={handleClick}>Vote article</button>
                <p>{article.body}</p>
                <CommentsByArticleId />
        </div>
            )
    }

export default SingleArticle;