import * as itemService from '../services/itemServices.js';

export const createItem = async (req, res) => {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el item', error })
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getItems(1, 0); // limit=0 devuelve todos
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener todos los items', error: error.message });
    }
};

export const getItems = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    try {
        const result = await itemService.getItems(page, limit);
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: 'Error al buscar items', error: error.message })
    }
};

export const getItem = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Error al intentar obtener item', error });
    }
};

export const updateItem = async (req, res) => {
    try {
        const updatedItem = await itemService.updateItemById(req.params.id, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar item', error })
    }
};

export const deleteItemById = async (req, res) => {
    try {
        await itemService.deleteItemById(req.params.id);
        res.status(200).json({ message: 'Item eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar item' })
    }
}