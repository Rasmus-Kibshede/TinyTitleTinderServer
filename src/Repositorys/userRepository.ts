/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { User } from '../EntityManual/User';
import { appDataSource } from './data-source';

export const userRepo = appDataSource.getRepository(User);


