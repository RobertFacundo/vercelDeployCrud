import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://picsum.photos/200/200?random=${Math.random()', // Imagen de avatar por defecto
        },
        cart: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, required: true }
        }]
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

export default User;