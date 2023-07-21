import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';


function NavBar() {
	const [_, setSearchParams] = useSearchParams()
	const [newSearchTerm, setNewSearchTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchParams({search: newSearchTerm})
		setNewSearchTerm("")
	}

    return (
        <section>
			<nav className="navbar">
			<h1 className="header">Northcoders News</h1>
				<ul>
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/api/articles">
						<li>Explore articles</li>
					</Link>
					<Link to="/api/topics">
						<li>Explore topics</li>
					</Link>
					<form className="search-form" onSubmit={handleSubmit}>
                        <label htmlFor="search"/>
                        <input 
						placeholder="Search articles..." 
						id="search" 
						type="text" 
						name="search" 
						value={newSearchTerm} 
						onChange={(e) => {setNewSearchTerm(e.target.value)}}/>
                        <button className="search-button-nav-bar">Search</button>
                    </form>
				</ul>
			</nav>
			</section>
    )
}
export default NavBar;