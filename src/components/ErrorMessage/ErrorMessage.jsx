const ErrorMessage = ({ message = "Oops, there was an error, please try reloading" }) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;