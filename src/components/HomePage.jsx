import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main>
            <h2>Welcome to Northcoders News</h2>
            <p>🚀 the place where you find the latest news</p>
            <Link to="api/articles">
            <button className="explore-button">Explore Articles</button>
            </Link>
            <Link to="api/topics">
            <button className="explore-button">Explore Topics</button>
            </Link>
        </main>
    )
}
export default HomePage;