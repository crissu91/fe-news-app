import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";



function NavBar() {
const { user, setUser } = useContext(UserContext);
const navigate = useNavigate()

const handleSignOut = () => {
	setUser(null)
	navigate('/api/sign-in')
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
				</ul>
			{ user ? (
			<div>
				<p>Logged in as {user}</p>
				<Link to="/api/my-account">My Account</Link>
                <Link onClick={handleSignOut}>Log out</Link>
			</div>
			) : (
			<div>
				<Link to="/api/log-in"><li>Log in</li></Link> 
				<Link to="/api/sign-up"><li>Sign-up</li></Link> 
			</div>
			)}
			</nav>
		</section>
    )
}
export default NavBar;