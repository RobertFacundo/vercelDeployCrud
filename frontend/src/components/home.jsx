import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import ItemsList from "./ItemsList";
import Footer from "./footer";
import Modal from "./Modal";
import ModalUserCarts from "./modalUserCarts";


const Home = () => {
    const { user } = useUser();
    const [usersWithCart, setUsersWithCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [isUserWithCartModalOpen, setIsUserWithCartModalOpen] = useState(false);


    useEffect(() => {
        const fetchUsersWithCart = async () => {
            try {
                const usersResponse = await axios.get('https://vercel-deploy-crud-eugh.vercel.app/api/users');
                const users = usersResponse.data;
                const filteredUsers = [];

                for (const u of users) {
                    try {
                        const cartResponse = await axios.get(`https://vercel-deploy-crud-eugh.vercel.app/api/cart/${u._id}`);
                        const cart = cartResponse.data; // Ya no accedemos a items, sino directamente a cart

                        if (cart && cart.length > 0) {
                            // Si el carrito tiene productos, lo agregamos al array
                            filteredUsers.push(u);
                        }
                    } catch (error) {
                        console.error(`Error al obtener el carrito de ${u.name}`, error);
                    }
                }

                setUsersWithCart(filteredUsers);
            } catch (error) {
                console.error('Error obteniendo usuarios con carros:', error)
            }
        };

        fetchUsersWithCart();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openUserCartModal = (userId) => {
        setSelectedUserId(userId);
        setIsUserWithCartModalOpen(true)
    }

    return (
        <div className=" text-center h-screen bg-gradient-to-bl from-gray-200 to-green-600">
            <div className="flex justify-between items-center px-4 py-4">
                <div className="flex space-x-2 overflow-x-auto w-2/5 max-w-[170px]  whitespace-nowrap">
                    {usersWithCart.map((u) => (
                        <img
                            key={u._id}
                            src={`https://picsum.photos/200/200?random=${Math.random() * 10000}`}
                            alt={`Avatar de ${u.name}`}
                            className="w-14 h-14 rounded-full border-2 border-yellow-500 shadow-md hover:scale-110 transition-transform"
                            title={`${u.name} tiene productos en el carro`}
                            onClick={()=> openUserCartModal(u._id)}
                        />
                    ))}
                </div>
                <h1 className="w-2/5 text-2xl font-semibold">
                    {user ? `¡Hola ${user.name}! Explora Digital Library` : 'Explora Digital Library'}
                </h1>
                {/* Usuario alineado a la derecha */}
                <div className="w-1/5 flex justify-end items-center space-x-2">
                    {user ? (
                        <>
                            <p className="text-sm font-semibold">{user.name}</p>
                            <img
                                src={user.avatar || `https://picsum.photos/200/200?random=${Math.random()}`}
                                alt="User Avatar"
                                className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                                title={`Ver perfil de ${user.name}`}
                                onClick={openModal}
                            />
                        </>
                    ) : (
                        <p
                            className="text-sm font-semibold cursor-pointer hover:underline ml-auto"
                            onClick={() => window.location.reload()}
                        >
                            Regístrate o inicia sesión
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <ItemsList />
            </div>

            {isModalOpen && <Modal user={user} onClose={closeModal} />}
            {isUserWithCartModalOpen && <ModalUserCarts userId={selectedUserId} onClose={()=> setIsUserWithCartModalOpen(false)}/>}


            <Footer />
        </div>
    );
};

export default Home;
