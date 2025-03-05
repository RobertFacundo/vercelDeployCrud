import bcrypt from 'bcrypt';
import * as userDAO from '../dao/userDAO.js';

export const createUser = async (data) => {
    if (!data.name || !data.email || !data.password) {
        throw new Error('Todos los datos son obligatorios');
    };

    const existingUser = await userDAO.getUserByEmail(data.email);
    if (existingUser) {
        throw new Error('Email ya registrado')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = { ...data, password: hashedPassword };

    return await userDAO.createUser(userData);
};

export const getUsers = async () => {
    return await userDAO.getUsers();
};

export const getUserById = async (id) => {
    const user = await userDAO.getUserById(id);
    if (!user) {
        throw new Error('User no encontrado');
    };
    return user;
};

export const updateUserById = async (id, data) => {
    const updatedUser = await userDAO.updateUserById(id, data);
    if (!updatedUser) {
        throw new Error('Usuario no encontrado');
    };
    return updatedUser;
};

export const deleteUserById = async (id) => {
    const deletedUser = await userDAO.deleteUserById(id);
    if (!deletedUser) {
        throw new Error('Usuario a eliminar no encontrado');
    };
    return deletedUser;
};

