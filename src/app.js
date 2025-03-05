import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import userRouter from './routes/usersRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors';

const app = express();

connectDB();
dotenv.config()

app.use(express.json());
app.use(cors());
app.use(passport.initialize());


app.use('/api', itemRoutes);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en port ${PORT}`)
})