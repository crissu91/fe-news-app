import { useState, useContext, useEffect } from 'react'
import { getUserByUsername } from '../api.js'
import Error from './Error'
import UserContext from '../contexts/userContext.jsx'
import { Link, redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function MyAccount() {
	const [isLoading, setIsLoading] = useState(true)
	const [apiError, setApiError] = useState(false)
	const { user, setUser } = useContext(UserContext)
	const [userInfo, setUserInfo] = useState([])
    const navigate = useNavigate();

	useEffect(() => {
		getUserByUsername(user)
			.then((user) => {
				setUserInfo(user[0])
				setIsLoading(false)
			})
			.catch((err) => {
				setApiError(err)
				setIsLoading(false)
			})
	}, [])

	const handleClick = () => {           
        console.log('go') 
        navigate("/api/log-in");
		setUser(null)
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
		<main className="user-account">
			<h2 className='user-details-title'>Your details</h2>
            <p className='user-name'>Name: {userInfo.name}</p>
            <p className='user-username'>Username: {userInfo.username}</p>
			<img src={userInfo.avatar_url} alt="avatar image" className='user-image'/>
			<Link to="/api/articles">
				<button>Explore articles</button>
			</Link>
			<button onClick={handleClick}>Log out</button>
		</main>
	);
}

export default MyAccount;