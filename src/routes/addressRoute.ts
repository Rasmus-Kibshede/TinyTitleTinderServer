import { Router } from 'express';
import * as addressController from '../Controllers/addressController';
import { validateParamsId } from '../Utils/routeUtil';

const addressRouter = Router();

addressRouter.post('/addresses', addressController.createAddress);
addressRouter.get('/addresses', addressController.getAllAddresses);
addressRouter.get('/addresses/:id', addressController.getAddressById);
addressRouter.put('/addresses', addressController.updateAddress);
addressRouter.put('/addresses/:id', validateParamsId, addressController.deleteAdress);

export default addressRouter;