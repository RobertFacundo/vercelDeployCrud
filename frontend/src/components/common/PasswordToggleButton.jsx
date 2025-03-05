import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordToggleButton = ({ isPasswordVisible, togglePasswordVisibility }) => (
    <button
        data-testid='password-toggle'
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute bottom-0 right-3 transform -translate-y-1/2'
    >
        {isPasswordVisible ? <FiEyeOff size={20} data-testid='eye-off-icon' /> : <FiEye size={20} data-testid='eye-icon' />}
    </button>
);

export default PasswordToggleButton;