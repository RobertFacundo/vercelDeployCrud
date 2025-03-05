import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import ReLogin from './ReLogin';
import { useAuth } from '../../hooks/useAuth';

vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}))

describe('ReLogin', () => {
    const mockSetIsAuthenticated = vi.fn();

    beforeEach(() => {
        useAuth.mockReturnValue({
            credentials: { email: '', password: '', isPasswordVisible: false },
            statusMessage: { type: '', message: '' },
            handleChange: vi.fn(),
            togglePasswordVisibility: vi.fn(),
            handleSubmit: vi.fn(),
        });

        render(<ReLogin setIsAuthenticated={mockSetIsAuthenticated} />);
    });

    test('Should render LoginForm component correctly', () => {
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
    });

    test('Should call handleSubmit when form is submitted', () => {
        const mockHandleSubmit = vi.fn();
    useAuth.default.mockReturnValue({
        handleSubmit: mockHandleSubmit,
    });

    // Renderizar el componente
    render(<ReLogin />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    // Rellenar los campos de texto con valores
    fireEvent.change(emailInput, { target: { value: 'correo@valido.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Simular el clic en el botón de envío
    fireEvent.click(submitButton);

    // Verificar que handleSubmit haya sido llamado
    expect(mockHandleSubmit).toHaveBeenCalled();
    });
})