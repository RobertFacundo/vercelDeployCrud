import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordToggleButton from './PasswordToggleButton';
import { vi } from 'vitest';

test('Renderiza el button con el icono correcto dependiendo del estado', () => {
    const mockTogglePasswordVisibility = vi.fn();

    render(<PasswordToggleButton isPasswordVisible={false} togglePasswordVisibility={mockTogglePasswordVisibility} />)
    let button = screen.getByTestId('eye-icon');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();

    render(<PasswordToggleButton isPasswordVisible={true} togglePasswordVisibility={mockTogglePasswordVisibility} />)
    button = screen.getByTestId('eye-off-icon');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
});

test('Lllama a la funcion mockTogglePasswordVisibility cuando s ehace click', async () => {
    const mockTogglePasswordVisibility = vi.fn();

    render(<PasswordToggleButton isPasswordVisible={false} togglePasswordVisibility={mockTogglePasswordVisibility} />)
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockTogglePasswordVisibility).toHaveBeenCalledTimes(1)
});