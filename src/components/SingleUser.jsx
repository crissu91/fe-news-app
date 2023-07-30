function SingleUser({ user }) {
	return (
		<li className="single-user">
				<img
					src={user.avatar_url}
					alt={`Image for ${user.name}`}
				/>
				<h3>{user.username}</h3>
		</li>
	);
}

export default SingleUser;