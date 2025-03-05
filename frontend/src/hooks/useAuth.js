import { useState } from 'react';
import { authService } from '../services/authServices'
import { useUser } from '../contexts/UserContext';

export const useAuth = (action, setIsAuthenticated) => {
    const [credentials, setCredentials] = useState({
        name: action === 'register' ? '' : undefined,
        email: '',
        password: '',
        isPasswordVisible: false
    });
    const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
    const { setUserData } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setCredentials({
            ...credentials,
            isPasswordVisible: !credentials.isPasswordVisible
        })
    };

    const handleLoginError = (error) => {
        console.error(error)
        setStatusMessage({ type: 'error', message: 'Autenticacion fallida' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await authService(action, credentials)

            if (action === 'login') {
                const { user, token } = response;
                setUserData({ name: user.name, userId: user._id, cart: user.cart });
                localStorage.setItem('token', token)
                setIsAuthenticated(true)
            } else if (action === 'register') {
                const { message } = response;
                console.log(message, 'mensaje de try submit')
                setStatusMessage({ type: 'success', message })
            }
        } catch (error) {
            console.log(error, 'console de useAuth')
            if (action === 'register' && typeof error === 'object') {
                setStatusMessage({ type: 'error', message: error })
            } else {
                handleLoginError(error);
            }
        }
    };

    return { credentials, statusMessage, handleChange, togglePasswordVisibility, handleSubmit };
}
