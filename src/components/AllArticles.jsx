import { useEffect, useState } from "react";
import { getAllArticles} from "../api";
import { Link, useLocation } from "react-router-dom";
import Error from "./Error"


function AllArticles() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState(null)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = Object.fromEntries(searchParams.entries());

    useEffect(()=>{
        getAllArticles(searchQuery)
        .then((data)=>{
            setArticles(data)
            setIsLoading(false)
        })
        .catch((err) =>{
            setApiError(err)
        })
    },[])

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
            {articles.map((article)=>{
                const formattedDate = new Date(article.created_at).toLocaleString()
                    return (<section className="articles" key={article.article_id} >
                        <h2 className="article-title-all">{article.title}</h2>
                        <img src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`} className="article-img"/>
                        <p>Author: {article.author}</p>
                        <p>Created at: {formattedDate}</p>
                        <Link to={`/api/articles/${article.article_id}`} key={article.article_id}>
                        <button>Read more</button></Link>
                    </section>)
                
                })
            }
    </main>
    )
}

export default AllArticles;