import { useEffect, useState } from "react"
import { getArticleById } from "../api"
import { useParams } from "react-router"

function SingleArticle() {
    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getArticleById(article_id)
        .then((res) =>{
            setArticle(res[0])
            setIsLoading(false)
        })
        .catch(console.log)
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
                <h2 className="article-title">{article.title}</h2>
                <img className="article-img-single" src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`}/>
            <ul key={article.article_id} className="single-article">
                <li>Author: {article.author}</li>
                <li>Created at: {article.created_at}</li>
                <li>Votes: {article.votes}</li>
                <li>Comments: {article.comment_count}</li>
                <li>Topic: {article.topic}</li>
            </ul>
                <p>{article.body}</p>
        </div>
            )
    }

export default SingleArticle;