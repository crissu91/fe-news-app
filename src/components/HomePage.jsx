import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main className="home-page">
            <img src="https://www.manchesterdigital.com/storage/6766/Northcoders-Primary-Logo---Red.png" alt="northcoders logo in colour red" />
            <h2>Welcome to Northcoders News</h2>
            <p>🚀 the place where you find the latest news</p>
            <Link to="/api/articles">
				<button>Explore articles</button>
			</Link>
        </main>
    )
}
export default HomePage;