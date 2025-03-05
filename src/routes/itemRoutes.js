import express from 'express';
import {
    createItem,
    getItems,
    getAllItems,
    getItem,
    updateItem,
    deleteItemById
} from '../controllers/itemController.js';

const router = express.Router();


router.post('/items', createItem);
router.get('/items', getItems);
router.get('/items/all', getAllItems);
router.get('/items/:id', getItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItemById);


export default router;