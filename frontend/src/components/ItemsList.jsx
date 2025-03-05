import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaTimes, FaCartPlus } from 'react-icons/fa';
import { useUser} from '../contexts/UserContext';
import { motion } from 'framer-motion';

const ItemsList = () => {
    const { user } = useUser();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {setUserData} = useUser()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://vercel-deploy-crud-eugh.vercel.app/api/items', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });
                setItems(response.data.items);
                setTotalPaginas(response.data.totalPaginas);
            } catch (error) {
                console.log('Error fecthing data', error)
            }
        };

        fetchItems();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPaginas) {
            setCurrentPage(newPage)
        }
    };

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
            } else if (e.key === 'ArrowRight') {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPaginas));
            }
        };

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [totalPaginas]);

    const handleShowItemDetails = async (_id) => {
        try {
            console.log("Requesting details for item ID:", _id);
            const response = await axios.get(`https://vercel-deploy-crud-eugh.vercel.app/api/items/${_id}`);
            setSelectedItem(response.data);
            setShowModal(true);
        } catch (error) {
            console.log('Error fetching data', error)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    }

    const handleAddToCart = async (itemId) => {
        try {
            console.log(user)
            const userId = user.userId
            console.log(userId)
            if (!userId) {
                console.error('No se encontró el userId');
                return;
            }
            await axios.post('https://vercel-deploy-crud-eugh.vercel.app/api/cart/add-to-cart', {
                userId,
                itemId,
                quantity: 1
            }
            );

            const updatedCart = [...user.cart, { productId: itemId }];
            setUserData({ ...user, cart: updatedCart });

            console.log('Producto agregado al carrito desde front');
            toast.success('¡Artículo agregado al carrito!', {
                position: "top-left",
                autoClose: 800,
                hideProgressBar: true,
                theme: "light",
            });
        } catch (error) {
            console.error('Error al agregar al carro FE', error.response.data)
            toast.error('Articulo ya agregado al carro.', {
                position: "top-left",
                autoClose: 800,
                hideProgressBar: true,
                theme: "light",
            });
        }
    }

    return (
        <div className="mt-3">
            {items.length > 0 ? (
                <div>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="absolute top-1/2 left-2 transform -translate-y-50  text-gray-800 hover:text-gray-700 disabled:text-gray-300 text-3xl font-bold p-2 transition-colors"
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPaginas}
                        className="absolute top-1/2 right-2 transform -translate-y-50 text-gray-800 hover:text-gray-700 disabled:text-gray-300 text-3xl font-bold p-2 transition-colors"
                    >
                        <FaArrowRight />
                    </button>
                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 ml-10 mr-10">
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item._id}-${index}`}
                                className="bg-white p-2 ml-3 mr-3 rounded-lg transform transition-transform 
                            ease-in-out duration-500 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden 
                            flex flex-col justify-between"
                                initial={{ opacity: 0 }}  // Empieza con opacidad 0
                                animate={{ opacity: 1 }}  // Termina con opacidad 1
                                exit={{ opacity: 0 }}     // Se desvanece con opacidad 0 al salir
                                transition={{ duration: 1.3 }}
                            >
                                <img src={`https://picsum.photos/200/200?random=${Math.random()}`} alt={item.name} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="text-sm font-semibold mt-2">{item.name}</h3>
                                <p className="description mt-1 text-xs text-gray-600">{item.description}</p>
                                <p className="mt-1 text-sm font-bold">{`$${item.price}`}</p>
                                <div className="flex justify-evenly items-center mt-2">
                                    {/* Botón "Ver detalles" */}
                                    <button
                                        onClick={() => handleShowItemDetails(item._id)}
                                        className="px-3 py-1 text-gray-600 py-2 transition-all duration-[2000ms] ease-in-out  bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-200 hover:to-green-200  text-xs"
                                    >
                                        Ver detalles
                                    </button>

                                    {/* Botón "Agregar al carrito" con ícono si el usuario está autenticado */}
                                    {user ? (
                                        <button
                                            onClick={() => handleAddToCart(item._id)}
                                            className="px-3 py-1 text-gray-700 hover:text-gray-800 rounded-md text-xl flex items-center ml-2">
                                            <FaCartPlus className="mr-1" /> {/* Ícono de carrito */}
                                        </button>
                                    ) : null}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            ) : (
                <p>Cargando productos...</p>
            )}

            {showModal && selectedItem && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/2 h-4/5 flex flex-row">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl"
                        >
                            <FaTimes />
                        </button>

                        {/* Imagen a la izquierda */}
                        <img
                            src={`https://picsum.photos/200/200?random=${Math.random()}`}
                            alt={selectedItem.name}
                            className="h-2/3 mt-20 rounded-md"
                        />


                        {/* Contenido a la derecha */}
                        <div className="flex flex-col gap-4 p-3">
                            <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                            <hr className="my-2" />
                            <p className="text-sm text-gray-600 flex-1 text-lg tracking-wider">{selectedItem.description}</p>
                            <p className="text-xl font-semibold mb-4">{`$${selectedItem.price}`}</p>

                            {/* Botón de agregar al carrito */}
                            {user ? (
                                <button
                                    onClick={() => handleAddToCart(selectedItem._id)}
                                    className="mt-2 p-3 text-gray-600 rounded-md transition-all duration-[2000ms] ease-in-out  bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-200 hover:to-green-200  text-xs">
                                    Agregar al carrito
                                </button>
                            ) : (
                                <p className="mt-1 text-red-500 text-xs">Debes iniciar sesión para agregar al carrito</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ItemsList;