import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom"


function AllArticles() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getAllArticles()
        .then((data)=>{
            setArticles(data)
            setIsLoading(false)
        })
        .catch(console.log)
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }


return (
    <main>
            {articles.map((article)=>{
                return (
                    <section className="articles" key={article.article_id} >
                        <h2 className="article-title-all">{article.title}</h2>
                        <img src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`} className="article-img"/>
                        <p>Author: {article.author}</p>
                        <p>Created at: {article.created_at}</p>
                        <Link to={`/api/articles/${article.article_id}`} key={article.article_id}>
                        <button>Read more</button></Link>
                    </section>
                )
            })}
    </main>
    )
}

export default AllArticles;