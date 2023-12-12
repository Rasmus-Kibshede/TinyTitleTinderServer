import { nameRepo as nameMysqlRepo } from './Mysql/nameRepository';
import { nameRepo as nameMongoRepo } from './Mongo/nameRepository';

export const nameRepository = () => {
  switch (global.dbChoice) {
    case 'mysql':
      return nameMysqlRepo;
    case 'mongodb':
      return nameMongoRepo;
  }
};