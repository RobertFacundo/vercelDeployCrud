import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm test', () => {
    const mockHandleChange = vi.fn();
    const mockTogglePasswordVisibility = vi.fn();
    const mockHandleSubmit = vi.fn();

    const credentials = {
        email: '',
        password: '',
        isPasswordVisible: false
    };

    const statusMessage = {
        message: '',
        type: ''
    };

    beforeEach(() => {
        render(
            <LoginForm
                credentials={credentials}
                statusMessage={statusMessage}
                handleChange={mockHandleChange}
                togglePasswordVisibility={mockTogglePasswordVisibility}
                handleSubmit={mockHandleSubmit}
            />
        );
    });

    test('Should render the form elements correctly', () => {
        //label text se modificó el component con tag htmlFor en el label y id en el input
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
    });

    test('Should handle email input change', () => {
        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } }); //diferencia entre fireevent y userevent //
        expect(mockHandleChange).toHaveBeenCalled();
    });
    test('Should handle Password input change', () => {
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(mockHandleChange).toHaveBeenCalled();
    });

    test('Should toggle password visibility on button click', () => {
        const toggleButton = screen.getByTestId('password-toggle');
        fireEvent.click(toggleButton);
        expect(mockTogglePasswordVisibility).toHaveBeenCalled();
    });

    test('should display text message if present', () => {
        const statusMessage = { type: 'success', message: 'Login successful' };
        render(
            <LoginForm
                credentials={credentials}
                handleChange={mockHandleChange}
                handleSubmit={mockHandleSubmit}
                togglePasswordVisibility={mockTogglePasswordVisibility}
                statusMessage={statusMessage}
            />
        );
        expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
    test('Should display error message is email not valid', () => {
        const statusMessage = { type: 'error', message: 'Autenticacion fallida' };
        const credentials = { Email: 'correo-invalido', contraseña: '123456' }
        render(
            <LoginForm
                credentials={credentials}
                handleChange={mockHandleChange}
                handleSubmit={mockHandleSubmit}
                togglePasswordVisibility={mockTogglePasswordVisibility}
                statusMessage={statusMessage}
            />
        );

        expect(screen.getByText(/Autenticacion fallida/i)).toBeInTheDocument();
    });
    test('Should display error message if password < 6', () => {
        const statusMessage = { type: 'error', message: 'Autenticacion Fallida' }
        const credentials = { Email: 'correo@valido.com', contraseña: '12345' }

        render(
            <LoginForm
                credentials={credentials}
                handleChange={mockHandleChange}
                handleSubmit={mockHandleSubmit}
                togglePasswordVisibility={mockTogglePasswordVisibility}
                statusMessage={statusMessage}
            />
        );
        expect(screen.getByText(/Autenticacion Fallida/i)).toBeInTheDocument();
    });
    test('Should display error mesagge if inputs are empty', () => {
        const statusMessage = { type: 'error', message: 'Autenticacion Fallida' }

        render(
            <LoginForm
                credentials={credentials}
                handleChange={mockHandleChange}
                handleSubmit={mockHandleSubmit}
                togglePasswordVisibility={mockTogglePasswordVisibility}
                statusMessage={statusMessage}
            />
        );

        expect(screen.getByText(/Autenticacion Fallida/i)).toBeInTheDocument();
    })
})