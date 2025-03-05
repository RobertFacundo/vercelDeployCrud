import React from "react";

const Footer = () => {
    return (
        <footer className="absolute bottom-0 w-full text-white">
            <div className="text-center pb-2">
                <p className="font-serif text-sm tracking-wider">
                    © Todos los derechos reservados 2025 | Desarrollado por{' '}
                    <a
                        href="https://www.linkedin.com/in/robertfacundodev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-800 italic"
                    >
                        Robert
                    </a>
                </p>
            </div>
        </footer>
    )
};

export default Footer;