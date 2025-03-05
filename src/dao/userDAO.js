
import User from "../models/user.js";

export const createUser = async (data) => {
    const newUser = new User(data);
    return await newUser.save();
};

export const getUsers = async () => {
    return await User.find();
}

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const updateUserById = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
}
