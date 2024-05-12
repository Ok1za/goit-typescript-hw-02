import React from 'react';

type ErrorMessageProps = {
    message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "Oops, there was an error, please try reloading" }) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;