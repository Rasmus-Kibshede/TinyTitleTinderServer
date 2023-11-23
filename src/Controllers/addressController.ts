import { Request, Response } from 'express';
import * as addressService from '../Services/addressService';
import { AddressRequestDTO } from '../DTO/addressDTO';
import * as responseController from '../Controllers/responseController';

export const createAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        city: req.body.city,
        zipcode: req.body.zipcode,
        street: req.body.street,
        location: req.body.location
    };
    const response = await addressService.createAddress(addressRequestDTO);
    responseController.response(res, response, 200);
};

export const getAllAddresses = async (req: Request, res: Response) => {
    const response = await addressService.getAddresses();
    responseController.response(res, response, 200);

};

export const getAddressById = async (req: Request, res: Response) => {
    const response = await addressService.getAddressById(Number(req.params.id));
    responseController.response(res, response, 200);
};

export const updateAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        addressId: req.body.addressId,
        city: req.body.city,
        zipcode: req.body.zipcode,
        street: req.body.street,
        location: req.body.location
    };
    const response = await addressService.updateAddress(addressRequestDTO);
    responseController.response(res, response, 200);
};

export const deleteAdress = async (req: Request, res: Response) => {
    const response = await addressService.deleteAddress(Number(req.params.id));
    responseController.response(res, response, 204);
};


