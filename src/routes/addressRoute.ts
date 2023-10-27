import { Router } from 'express';
import { createAddress, getAllAddresses } from '../Controllers/addressController';

const addressRouter = Router();

addressRouter.post('/addresses', createAddress);
addressRouter.get('/addresses', getAllAddresses);

export default addressRouter;