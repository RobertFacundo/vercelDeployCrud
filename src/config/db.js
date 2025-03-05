import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI);
        console.log('Conexion exitosa a la base de datos')
    } catch (err) {
        console.error('Error al conectar a la base de datos', err)
        process.exit(1);
    }
};

export default connectDB;