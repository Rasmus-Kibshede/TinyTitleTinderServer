import { Request, Response } from 'express';
import * as addressService from '../Services/addressService';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';

export const createAddress = async (req: Request, res: Response) => {
    const addressRequestDTO: AddressRequestDTO = {
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        location: req.body.location
    };

    const response = await addressService.createAddress(addressRequestDTO);
    addressResponse(response ? response : { err: response }, res, 201);
};

export const getAllAddresses = async (req: Request, res: Response) => {
    const response = await addressService.getAddresses();
    
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(200).send(response);
    }
};

export const getAddressById = async (req: Request, res: Response) => {
    const response = await addressService.getAddressById(Number(req.params.id));
    addressResponse(response ? response : { err: response }, res, 201);
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

    addressResponse(response ? response : { err: response }, res, 201);
};

export const deleteAdress = async (req: Request, res: Response) => {
    const response = await addressService.deleteAddress(Number(req.params.id));
    
    addressResponse(response ? response : { err: response }, res, 201);
};

const addressResponse = (response: AddressResponseDTO | { err: string }, res: Response, statusCode: number) => {
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(statusCode).send(response);
    }
};