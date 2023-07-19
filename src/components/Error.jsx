const Error = ({errorStatus, errorMessage}) => {
    return (
        <div className="error">
            <p className="error-status">{errorStatus}</p>
            <p className="error-message">{errorMessage}</p>
        </div>
    )
}

export default Error;