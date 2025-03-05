import React from "react";
import ReLogin from '../components/Login/ReLogin';
import Register from './Register/Register'
import Button from "./common/Button";


const Authentication = ({ setIsAuthenticated, setIsGuest }) => {
    const handleGuestAccess = () => {
        setIsGuest(true);
    };

    return (
        <div className="relative h-screen">
            {/* Fondo negro con opacidad */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
            <div className=" relative z-20  flex items-center justify-center h-screen flex-col">
                <div className="flex items-center">
                    <div className="mr-4 flex flex-col items-center  transform transition-all ease-in-out duration-1000 hover:scale-105">
                        <Register />
                    </div>
                    <div className="mr-4 flex flex-col items-center transform transition-all ease-in-out duration-1000 hover:scale-105">
                        <ReLogin setIsAuthenticated={setIsAuthenticated} />
                    </div>
                </div>

                <Button
                    onClick={handleGuestAccess}
                    className='p-6 mt-6 transform transition-all ease-in-out duration-1000 hover:scale-105'
                >Acceder como Invitado</Button>
            </div>
        </div>
    );
};

export default Authentication;