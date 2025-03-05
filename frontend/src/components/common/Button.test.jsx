import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Button from './Button';

test('Renderiza el button con el texto proporcionado', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
});

test('Llama a la funcion onClick cuando se hace click', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole('button');

    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1)
});