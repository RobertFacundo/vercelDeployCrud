import React from "react";
import PasswordToggleButton from '../common/PasswordToggleButton';
import Button from "../common/Button";

const RegisterForm = ({
    credentials,
    statusMessage,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <h2 className="text-center text-xl font-semibold mb-4">Registro</h2>

            {statusMessage.type === 'success' ? (
                <div className="text-center text-green-600 mt-4">
                    <p className="text-lg italic tracking-normal font-medium">
                        ¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {statusMessage.message?.name && <p className="text-red-500 text-sm">{statusMessage.message.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {statusMessage.message?.email && <p className="text-red-500 text-sm">{statusMessage.email}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type={credentials.isPasswordVisible ? 'text' : 'password'}
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
                        {statusMessage.message?.password && <p className="text-red-500 text-sm">{statusMessage.message.password}</p>}
                    </div>

                    {/* <button
                        type="submit"
                        className="w-full text-gray-600 py-2 transform transition-all duration-[2000ms] 
                        ease-in-out bg-gradient-to-l from-gray-100 to-gray-300 text-white rounded-md
                        focus:outline-none focus:ring-2 focus:ring-purple-600
                        hover:from-gray-200 hover:to-green-200 tracking-normal"
                    >
                        Registrarse
                    </button> */}
                    <Button type='submit' className="w-full">Registrarse</Button>
                </>
            )}
            {statusMessage.type === 'error' && (
                <p className="text-center mt-4 text-red-500">{statusMessage.message}</p>
            )}
        </form>
    );
};

export default RegisterForm;