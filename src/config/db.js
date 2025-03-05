import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/crudDB');
        console.log('Conexion exitosa a la base de datos')
    } catch (err) {
        console.error('Error al conectar a la base de datos', err)
        process.exit(1);
    }
};

export default connectDB;