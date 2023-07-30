import { useState, useContext } from 'react';
import { postUser } from '../api';
import UserContext from '../contexts/userContext';
import Error from './Error';

function SignUp() {
	const [newUser, setNewUser] = useState({
		username: '',
		name: '',
		avatar_url: '',
	})
	const [apiError, setApiError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { user, setUser } = useContext(UserContext)
    const { isSignedUp, setIsSignedUp} = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		postUser(newUser)
			.then(({ postedUser }) => {
				setIsLoading(false);
				setUser(postedUser[0].username)
                setIsSignedUp(true)
			})
			.catch((err) => {
				setApiError(err);
				setIsLoading(false);
			})
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
        <main className='sign-up-container'>
			<h2>Hello!</h2>
            { isSignedUp ? ( <p>You have successfully signed up!</p>) : 
			(
                <div>
                <form onSubmit={handleSubmit} className="signUpForm">
                <input
				id="username"
				type="text"
				value={newUser.username}
				placeholder="Username"
				onChange={(e) =>
					setNewUser((newUser) => {
						return { ...newUser, username: e.target.value };
					})
				}
				required
			/>
			<input
				id="name"
				type="text"
				value={newUser.name}
				placeholder="Name"
				onChange={(e) =>
					setNewUser((newUser) => {
						return { ...newUser, name: e.target.value };
					})
				}
				required
			/>
			<input
				id="avatar_url"
				type="text"
				value={newUser.avatar_url}
				placeholder="URL for your profile image"
				onChange={(e) =>
					setNewUser((newUser) => {
						return { ...newUser, avatar_url: e.target.value };
					})
				}
				required
			/>
			<button>Sign-up</button>
		</form>
        </div>
        )}
        </main>
	)
}

export default SignUp;