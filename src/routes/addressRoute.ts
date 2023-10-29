import { Router } from 'express';
import { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAdress } from '../Controllers/addressController';

const addressRouter = Router();

addressRouter.post('/addresses', createAddress);
addressRouter.get('/addresses', getAllAddresses);
addressRouter.get('/addresses/:id', getAddressById);
addressRouter.put('/addresses', updateAddress);
addressRouter.put('/addresses/:id', deleteAdress);

export default addressRouter;