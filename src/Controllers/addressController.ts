import { Request, Response } from 'express';
import * as addressService from '../Services/addressService';
import { AddressRequestDTO } from '../DTO/addressDTO';

export const createAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        location: req.body.location
    };

    const response = await addressService.createAddress(addressRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result : response.error.message);
};

export const getAllAddresses = async (req: Request, res: Response) => {
    const response = await addressService.getAddresses();
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result : response.error.message);
};

export const getAddressById = async (req: Request, res: Response) => {
    const response = await addressService.getAddressById(Number(req.params.id));
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result : response.error.message);
};

export const updateAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        addressId: req.body.addressId,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        location: req.body.location
    };
    const response = await addressService.updateAddress(addressRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result : response.error.message);

};

export const deleteAdress = async (req: Request, res: Response) => {
    const response = await addressService.deleteAddress(Number(req.params.id));
    res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result : response.error.message);
};

