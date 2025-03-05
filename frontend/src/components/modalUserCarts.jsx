import { useEffect, useState } from "react";
import axios from "axios";

const ModalUserCarts = ({ userId, onClose }) => {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
                setUser(response.data)
            } catch (error) {
                console.error('Error al obtener usuarios', error.message)
            }
        };
        fetchUser();
    }, [userId])

    // useEffect adicional para imprimir 'user' solo cuando cambie
    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const response = await axios.get(`https://vercel-deploy-crud-eugh.vercel.app/api/cart/${userId}`);
                setCart(response.data)
            } catch (error) {
                console.error('Error al obtener cart', error.message)
            }
        };
        fetchUserCart();

    }, [userId, user]);

    useEffect(() => {
        console.log(cart, ' log del cart desde el useEffect'); // Esto solo se ejecutará cuando 'user' cambie
    }, [user]);

    const fetchProducts = async (idProducts) => {
        try {
            if (idProducts.length === 0) {
                console.log("El carrito está vacío.");
                return;
            }

            // Crear un array de promesas para cada solicitud a la API
            const productPromises = idProducts.map(id =>
                axios.get(`https://vercel-deploy-crud-eugh.vercel.app/api/items/${id}`)
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
            console.log(validProducts, ' log de productos obtenidos, desde modalUsercARTS!')

            // Actualizar el estado con los productos obtenidos
            setCartItems(validProducts);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const getProductsId = (cart) => {
        return cart && cart.length > 0
            ? cart.map(item => {
                const productId = item.productId ? item.productId._id : item._id;
                console.log("Product ID:", productId);  // Verifica que el ID es el esperado
                return productId || item._id;
            }).filter(id => id !== undefined && id !== null)
            : [];
    }

    useEffect(() => {
        if (cart.length > 0) {
            // Filtrar IDs válidos (que no sean undefined ni null)
            const idProducts = getProductsId(cart)
            console.log("ID de productos: desde useefecct", idProducts); 
            fetchProducts(idProducts); // Obtener los productos completos
        }
    }, [cart]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {user ? (
                    <>
                        <h2 className="text-lg font-bold">Carrito de {user.name}</h2>
                        <ul>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <li key={item._id}>{item.name} - ${item.price}</li>
                                ))
                            ) : (
                                <p>No hay productos en el carrito</p>
                            )}
                        </ul>
                    </>
                ) : (
                    <p>Cargando datos del usuario...</p>
                )}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Cerrar</button>
            </div>
        </div>
    )
};

export default ModalUserCarts;