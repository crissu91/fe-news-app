import { useEffect } from "react";
import { getArticlesQueries } from "../api";
import { useSearchParams } from 'react-router-dom'


function ArticleQueries({setArticles}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortByQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")



    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        const newSortParams = new URLSearchParams(searchParams);
        newSortParams.set('sort_by', newSortBy)
        setSearchParams(newSortParams)
      }

    const handleOrderChange = (event) => {
        const newOrder = event.target.value;
        const newOrderParams = new URLSearchParams(searchParams);
        newOrderParams.set('order', newOrder)
        setSearchParams(newOrderParams)
    }

    useEffect(() => {
    getArticlesQueries(sortByQuery, orderQuery)
    .then((res)=>{
        setArticles(res)
    })
    },[sortByQuery, orderQuery, setArticles])


    return (
        <form className="sort-order-form">
            <label className="so-form-label" htmlFor="sort-by">Sort articles</label>
            <select className="so-form-select" id="sort-by" name="sort-by" onChange={handleSortChange}>
                <option value="none">...</option>
                <option value="created_at">Date</option>
                <option value="comment_count">Comment count</option>
                <option value="votes">Votes</option>
            </select>
            <p className="radio-button-title">Order</p>
            <input type="radio" id="asc" name="answer" value="asc" checked={orderQuery === "asc"} onChange={handleOrderChange}>
            </input>
            <label htmlFor="asc">Ascendent</label>
            <input type="radio" id="desc" name="answer" value="desc" checked={orderQuery === "desc"} onChange={handleOrderChange}>
            </input>
            <label htmlFor="desc">Descendent</label>
        </form>
    )
}

export default ArticleQueries;