const Error = ({errorStatus, errorMessage}) => {
    return (
        <main className="error">
            <p className="error-status">{errorStatus}</p>
            <p className="error-message">{errorMessage}</p>
        </main>
    )
}

export default Error;