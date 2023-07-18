import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h2>Welcome to Northcoders News</h2>
            <p>🚀 the place where you find the latest news</p>
            <Link to="api/articles">
            <button>Explore Articles</button>
            </Link>
        </div>
    )
}
export default HomePage;