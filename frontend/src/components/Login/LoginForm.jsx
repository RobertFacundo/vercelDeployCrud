import React from 'react';
import PasswordToggleButton from '../common/PasswordToggleButton';
import Button from '../common/Button';

const LoginForm = ({ credentials, statusMessage, handleChange, togglePasswordVisibility, handleSubmit }) => (
    <form data-testid="login-form" onSubmit={handleSubmit} className='bg-white p-4 rounded-lg shadow-lg w-80 '>
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <div className="mb-10">
            <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</label>
            <input id='email' type="email" name="email" value={credentials.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-6 pt-8 relative">
            <label htmlFor='contraseña' className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
                id='contraseña'
                type={credentials.isPasswordVisible ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <PasswordToggleButton
                isPasswordVisible={credentials.isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        </div>
        <Button type='submit' className='mb-2 w-full mt-6'>Ingresar</Button>

        {statusMessage.message && (
            <p
                data-testid='error-message'
                className={`text-center mt-4 ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {statusMessage.message}
            </p>
        )}
    </form>
);

export default LoginForm;