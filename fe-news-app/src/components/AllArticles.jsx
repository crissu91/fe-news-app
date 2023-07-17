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
    <section>
            {articles.map((article)=>{
                return (
                    <div key={article.article_id} className="articles">
                        <h2>{article.title}</h2>
                        <img width="500px" src={`${article.article_img_url}`} />
                        <p>Author: {article.author}</p>
                        <p>Created at: {article.created_at}</p>
                        <p>Votes: {article.votes}</p>
                        <p>Comments: {article.comment_count}</p>
                        <p></p>Topic: {article.topic}
                    </div>
                )
            })}
    </section>
    )
}

export default AllArticles;