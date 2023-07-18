import { useEffect, useState } from "react";
import { getAllArticles, getArticleById } from "../api";
import { Link } from "react-router-dom"
import SingleArticle from "./SingleArticle";

function AllArticles() {
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getAllArticles()
        .then((data)=>{
            setArticles(data)
        })
    },[])


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