import axios from "axios";

const API_URL = 'http://localhost:3000/api/users';

export const authService = async (action, data) => {
    try {
        const endpoint = action === 'login' ? '/login' : '/register';
        const response = await axios.post(`${API_URL}${endpoint}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response, 'logtry')

        if (action === 'login') {
            localStorage.setItem('token', response.data.token)
            return { user: response.data.user, token: response.data.token };
        } else {
            return { message: response.data.message || '¡Usuario registrado exitosamente!' }
        }
    } catch (error) {
        console.log(error, 'authservice error')
        if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
            const formattedErrors = {};

            errors.forEach(err => {
                console.log('Procesando error:', err);  

                if (err.msg) {
                    formattedErrors[err.path] = err.msg;
                }
            });
            throw formattedErrors;
        } else {
            if (error.response && error.response.status === 401) {
                throw new Error('Email o contraseña incorrectos');
            } else {
                throw new Error('Autenticación fallida');
            }
        }
    }
}

