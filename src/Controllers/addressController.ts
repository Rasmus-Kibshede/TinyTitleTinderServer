import { Request, Response, response } from 'express';
import * as addressService from '../Services/addressService';
import { AddressRequestDTO } from '../DTO/addressDTO';

export const createAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        city: req.body.city,
        zipcode: req.body.zipcode,
        address:req.body.address
    };
    
    const response = await addressService.createAddress(addressRequestDTO);
    res.send(response);
};

export const getAllAddresses = async (req: Request, res: Response) => {
    const response = await addressService.getAddresses();
    res.send(response);
};

export const getAddressById = async (req: Request, res: Response) => {
    const response = await addressService.getAddressById(Number(req.params.id)); 
    res.send(response); 
};

export const updateAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        addressId: req.body.addressId,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address
    };
    const response = await addressService.updateAddress(addressRequestDTO);
        if(!)
};