import * as itemDAO from '../dao/itemDAO.js';

export const createItem = async (data) => {
    if (!data.name || !data.description || !data.price) {
        throw new Error('Todos los campos son obligatorios');
    }
    return await itemDAO.createItem(data);
}

export const getItems = async (page = 1, limit = 6) => {
    try {
        const items = await itemDAO.getItems(page, limit);
        const totalItems = await itemDAO.countItems();
        const totalPaginas = Math.ceil(totalItems / limit);

        return {
            items,
            totalItems,
            totalPaginas,
            currentPage: page,
        }
    }catch(error){
        throw new Error('Erroa lobtener items'+ error.message)
    }
};

export const getItemById = async (id) => {
    const item = await itemDAO.getItemById(id);
    if (!item) {
        throw new Error('Item no encontrado');
    }
    return item;
}

export const updateItemById = async (id, data) => {
    const updatedItem = await itemDAO.updateItemById(id, data);
    if (!updatedItem) {
        throw new Error('Item no encontrado');
    }
    return updatedItem;
}

export const deleteItemById = async (id) => {
    const deletedItem = await itemDAO.deleteItemById(id);
    if (!deletedItem) {
        throw new Error('Item no encontrado para eliminar');
    }
    return deletedItem;
}
