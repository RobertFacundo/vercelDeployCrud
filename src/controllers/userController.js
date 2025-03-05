import * as userServices from '../services/userServices.js';

export const createUser = async (req, res) => {
    try {
        const newUser = await userServices.createUser(req.body);
        res.status(201).json({ message: 'Usuario creado exitosamente', newUser: newUser })
    } catch (error) {
        res.status(400).json({ message: 'Error al crear usuario', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userServices.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener usuario', error: error.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const updatedUser = await userServices.updateUserById(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar user', error: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userServices.deleteUserById(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ message: 'Eror al eliminar usuario', error: error.message })
    }
};
