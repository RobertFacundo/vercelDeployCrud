import React from "react";

const Button = ({ type = 'button', onClick, children, className = '' }) => {
    return (
        <button
            data-testid='test-button'
            type={type}
            onClick={onClick}
            className={`text-gray-600 py-2 ease-in-out 
                       bg-gradient-to-r from-gray-200 to-gray-300 rounded-md focus:outline-none 
                       focus:ring-2 focus:ring-green-600 hover:from-gray-200 hover:to-green-200 tracking-wide ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;