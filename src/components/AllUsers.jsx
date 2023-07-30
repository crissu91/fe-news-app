import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import SingleUser from '../components/SingleUser';
import Error from './Error';


function AllUsers() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setApiError] = useState(null);

	useEffect(() => {
		getUsers()
			.then(({ users }) => {
				setUsers(users);
				setIsLoading(false);
			})
			.catch((err) => {
				setApiError(err);
				setIsLoading(false);
			});
	}, []);

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
		<>
			<ul className="users-list">
				{users.length === 0 ? (
					<p>No users to show.</p>
				) : (
					users.map((user) => {
						return <SingleUser key={user.user_id} user={user} />;
					})
				)}
			</ul>
		</>
	);
}

export default AllUsers;

