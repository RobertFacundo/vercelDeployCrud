import Item from "../models/item.js";

export const createItem = async (data) => {
    const newItem = new Item(data);
    return await newItem.save();
};

export const getItems = async (page = 1, limit = 6) => {
    return await Item.find().skip((page - 1) * limit).limit(limit);
};
export const countItems = () => {
    // Contar el total de items sin paginación
    return Item.countDocuments();
};

export const getItemById = async (id) => {
    return await Item.findById(id);
};

export const updateItemById = async (id, data) => {
    return await Item.findByIdAndUpdate(id, data, { new: true });
};

export const deleteItemById = async (id) => {
    return await Item.findByIdAndDelete(id);
}