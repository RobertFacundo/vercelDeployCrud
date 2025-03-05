import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';

const ReLogin = ({ setIsAuthenticated }) => {
    const {credentials, statusMessage, handleChange, togglePasswordVisibility, handleSubmit } = useAuth('login', setIsAuthenticated);

    return (
        <LoginForm
        credentials={credentials}
        statusMessage={statusMessage}
        handleChange={handleChange}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
        />
    );
};

export default ReLogin;