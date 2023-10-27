import Router from 'express'; 
import { validateCredintials } from '../Utils/routeUtil';
import { createAddress, getAllAddresses } from '../Controllers/addressController';

const addressRouter = Router(); 

addressRouter.post('/addresses', validateCredintials, createAddress);
addressRouter.get('/addresses', getAllAddresses);

