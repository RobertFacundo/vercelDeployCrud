import React, { useState, useEffect } from 'react';
import { createProduct, addToCart } from './CartService.js'
import { useUser } from '../contexts/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'

const Modal = ({ onClose }) => {
    const { user } = useUser();
    const [item, setItem] = useState({ name: '', description: '', price: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { setUserData } = useUser()

    const uid = user.userId;
    const cart = user.cart

    const fetchProducts = async (idProducts) => {
        try {
            if (idProducts.length === 0) {
                console.log("El carrito está vacío.");
                return;
            }

            // Crear un array de promesas para cada solicitud a la API
            const productPromises = idProducts.map(id =>
                axios.get(`http://localhost:3000/api/items/${id}`)
                    .then(response => response.data)
                    .catch(error => {
                        console.error(`Error al obtener el producto ${id}:`, error);
                        return null; // Si hay un error, retornamos null para evitar que se interrumpa todo
                    })
            );

            // Esperar a que todas las promesas se resuelvan
            const productData = await Promise.all(productPromises);

            // Filtrar los productos válidos (que no sean null)
            const validProducts = productData.filter(product => product !== null);
            console.log(validProducts, ' log desdel el useEffect')

            // Actualizar el estado con los productos obtenidos
            setProductDetails(validProducts);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    //* actualizar el renderizado de los productos del modal user al agregar productos nuevos 

    useEffect(() => {
        if (cart.length > 0) {
            const idProducts = cart.map(c => c.productId);
            console.log("modal.jsxCarrito:", cart);
            setCartItems(cart); // Guardar los productos del carrito en el estado
            fetchProducts(idProducts);
        }
    }, [cart]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const newItem = await createProduct(item);
            console.log(newItem, 'console desde la creacion del product')
            await addToCart(uid, newItem._id);

            // Actualizar carrito en el contexto después de agregar el producto
            const updatedCart = [...cart, { productId: newItem._id }]
            setUserData({ ...user, cart: updatedCart })
            setCartItems(updatedCart);
            // Aquí es donde puedes llamar a fetchProducts con los productos actualizados
            const idProducts = updatedCart.map(item => item._id);
            console.log(idProducts, 'cnosole del handlesubmit del modal')
            fetchProducts(idProducts);

            toast.success('¡Artículo agregado al carrito!', {
                position: "top-left",
                autoClose: 800,
                hideProgressBar: true,
                theme: "light",
            });
        } catch (error) {
            console.error(error.message);
            toast.error('Articulo ya agregado al carro.', {
                position: "top-left",
                autoClose: 800,
                hideProgressBar: true,
                theme: "light",
            });
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-2/3 flex">
                {/* Columna izquierda: Datos del usuario y productos en el carrito */}
                <div className="w-2/3 pr-4 overflow-y-auto max-h-[400px]">
                    <h2 className="text-xl font-semibold mb-4">Datos del usuario y carrito</h2>

                    {/* Mostrar los datos del usuario */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Datos del usuario</h3>
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    {/* Mostrar los items del carrito */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Productos en tu carrito</h3>
                        <div className="overflow-x-auto">
                            <ul className="flex space-x-4">
                                {cart.map(cartItem => {
                                    // Buscar el producto correcto en `productDetails`
                                    const product = productDetails.find(p => p._id === cartItem.productId);

                                    return (
                                        <li key={cartItem._id} className="border p-4 w-48">
                                            {product ? (
                                                <>
                                                    <p><strong>Nombre:</strong> {product.name}</p>
                                                    <p><strong>Descripción:</strong> {product.description}</p>
                                                    <p><strong>Precio:</strong> ${product.price}</p>
                                                    <p><strong>Cantidad:</strong> {cartItem.quantity}</p>
                                                </>
                                            ) : (
                                                <p>Cargando producto...</p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Formulario para crear un nuevo producto */}
                <div className="w-1/3 pl-4">
                    <h2 className="text-xl font-semibold mb-4">Crear nuevo producto</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Descripción</label>
                            <input
                                type="text"
                                name="description"
                                value={item.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            {isLoading ? 'Creando...' : 'Crear y agregar al carrito'}
                        </button>
                    </form>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Modal;