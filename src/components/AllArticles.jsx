import { useEffect, useState } from "react";
import { getAllArticles } from "../api";

function AllArticles() {
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getAllArticles().then((data)=>{
            setArticles(data)
        })
    },[])

return (
    <main>
            {articles.map((article)=>{
                return (
                    <section key={article.article_id} className="articles">
                        <h2>{article.title}</h2>
                        <img width="500px" src={`${article.article_img_url}`} alt={`image reflecting the ${article.title}`}/>
                        <p>Author: {article.author}</p>
                        <p>Created at: {article.created_at}</p>
                        <p>Votes: {article.votes}</p>
                        <p>Comments: {article.comment_count}</p>
                        <p>Topic: {article.topic}</p>
                    </section>
                )
            })}
    </main>
    )
}

export default AllArticles;