import React from "react";
import { useAuth } from "../../hooks/useAuth";
import RegisterForm from "./RegisterForm";

const Register = () => {
    const { credentials, statusMessage, handleChange, togglePasswordVisibility, handleSubmit } = useAuth('register');

    return <RegisterForm
        credentials={credentials}
        statusMessage={statusMessage}
        handleChange={handleChange}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
    />
}

export default Register;