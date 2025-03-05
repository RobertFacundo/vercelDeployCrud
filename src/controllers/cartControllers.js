import User from "../models/user.js";
import Item from "../models/item.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }

        const itemIndex = user.cart.findIndex(
            (cartItem) => cartItem.productId.toString() === itemId.toString()
        );

        if (itemIndex !== -1) {
            return res.status(400).json({ message: 'Este articulo ya esta en el carrito' });
        } else {
            user.cart.push({
                productId: itemId,
                quantity: quantity,
            })
        }

        await user.save();

        return res.status(200).json({ message: 'Articulo agregadoal carro' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al agregar el articulo al carro' });
    }
}

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("cart.productId");

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user.cart); 
    } catch (error){
        console.error(error);
        return res.status(500).json({message: 'Error al obtener carro'})
    }
}