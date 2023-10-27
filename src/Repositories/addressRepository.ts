import { Address } from '../Entities/Address';
import { appDataSource } from './data-source';

export const addressRepo = appDataSource.getRepository(Address);