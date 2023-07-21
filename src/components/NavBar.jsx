import { Link } from "react-router-dom";

function NavBar() {
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
					<form className="search-form">
                        <label htmlFor="search"/>
                        <input placeholder="Search articles..." id="search" type="text" name="search"></input>
                        <button className="search-button-nav-bar">Search</button>
                    </form>
				</ul>
			</nav>
			</section>
    )
}
export default NavBar;