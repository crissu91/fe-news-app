import { useState, useContext } from 'react';
import { getUserByUsername } from '../api';
import UserContext from '../contexts/userContext';
import Error from './Error';
import { Link } from 'react-router-dom';

function SignIn() {
	const [username, setUsername] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [apiError, setApiError] = useState(null)
	const { user, setUser } = useContext(UserContext)
    const [isSignedIn, setIsSignedIn] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		getUserByUsername(username)
			.then((user) => {
				setIsLoading(false)
				setUser(user[0].username)
                setIsSignedIn(true)      
			})
			.catch((err) => {
				setApiError(err)
				setIsLoading(false)
			})
            setUsername('')
 
	}

	if (isLoading) {
        return <p>Loading...</p>
    }

    if (apiError) {
        return (
            <Error 
                errorStatus={apiError.response?.status}
                errorMessage={apiError.response?.data?.msg || 'Oops! Something went wrong. Please try again'}
            />
        )
    } 

	return (
		<main className="SignInContainer">
			<h2>Welcome!</h2>
            {isSignedIn && user? ( 
                <div>
                    <p>You have successfully signed in as {user}!</p>
                    <Link to="/api/articles">
				        <button>Explore articles</button>
			        </Link>
                </div>
                ) : (
			    <form onSubmit={handleSubmit} className="SignInForm">
                    <label htmlFor="Username"></label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button>Log in</button>
			    </form>
            )}
		</main>
	)
}

export default SignIn;