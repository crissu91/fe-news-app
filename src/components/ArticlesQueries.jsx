import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'


function ArticleQueries() {
    const [_, setSearchParams] = useSearchParams()
    const [order, setOrder] = useState()
    const [sort_by, setSort] = useState()
    const removeUndefined = obj => JSON.parse(JSON.stringify(obj));

    const handleSortChange = (event) => {
        setSort(event.target.value)
      }

    const handleOrderChange = (event) => {
        setOrder(event.target.value)
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSearchParams(removeUndefined({sort_by, order}));
    }


    return (
        <div className="article-queries-box">
        <form className="sort-order-form" onSubmit={handleFormSubmit}>
            <label className="so-form-label" htmlFor="sort-by">Sort articles</label>
            <select className="so-form-select" id="sort-by" name="sort_by" onChange={handleSortChange}>
                <option value="none">...</option>
                <option value="created_at">Date</option>
                <option value="comment_count">Comment count</option>
                <option value="votes">Votes</option>
            </select>
            <p className="radio-button-title">Order</p>
            <input type="radio" id="asc" name="order" value="asc" checked={order === "asc"} onChange={handleOrderChange}>
            </input>
            <label htmlFor="asc">Ascendent</label>
            <input type="radio" id="desc" name="order" value="desc" checked={order === "desc"} onChange={handleOrderChange}>
            </input>
            <label htmlFor="desc">Descendent</label>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default ArticleQueries;