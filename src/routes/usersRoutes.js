import { Router } from 'express';
import { validateUser } from '../middlewares/validationMiddleware.js';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById} from '../controllers/userController.js';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middlewares/jwtValidation.js';
import passport from '../config/passportConfig.js'

const router = Router();

router.post('/register', validateUser, createUser);
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if(!req.user){
        return res.status(400).json({message: 'Email o contraseña incorrectas'})
    }
    const user = req.user;

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.status(200).json({
        message: 'Autenticado exitosamente',
        user,
        token
    })
});
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', requireAuth, updateUserById);
router.delete('/:id', deleteUserById);

export default router;