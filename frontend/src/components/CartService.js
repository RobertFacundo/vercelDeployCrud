import axios from 'axios';

export const createProduct = async (item) => {
    try {
        const response = await axios.post('http://localhost:3000/api/items', item);
        return response.data
    } catch (error) {
        console.error('Error creando el producto:', error.message);
        throw new Error('Error creando el producto');
    }
};

export const addToCart = async (userId, itemId) => {
    try {
        const response = await axios.post('http://localhost:3000/api/cart/add-to-cart', {
            userId,
            itemId,
            quantity: 1,
        });
        return response.status === 200;
    } catch (error){
        console.error('Error agregando al carro:', error);
        throw new Error('Error agregando item al carro')
    }
};