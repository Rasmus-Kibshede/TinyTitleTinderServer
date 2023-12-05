import { userRepo as userMysql } from './mysql/userRepository';
import { userRepoMDB as userMongo } from './mongo/userRepository';
import { parentRepo as parentMysql } from './mysql/parentRepository';
import { parentRepo as parentMongo } from './mysql/parentRepository';

// export const data = (entity: string) => {
//   const dbChoice = global.dbChoice;
//   const repos = [
//     { name: `${dbChoice}User`, repo: userMysql },
//     { name: `${dbChoice}User`, repo: userMongo },
//     { name: `${dbChoice}Parent`, repo: parentMysql },
//     { name: `${dbChoice}Parent`, repo: parentMongo },
//   ];
//   switch (dbChoice) {
//     case 'mysql':
//       return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
//     case 'mongodb':
//       return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
//     default:
//       return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
//   }
// };

// export const data = (entity: string) => {
//   switch (entity) {
//     case 'user':
//       return dataUser();
//     case 'parent':
//       return dataParent();
//   }
// };

export const dataUser = () => {
  switch (global.dbChoice) {
    case 'mysql':
      return userMysql;
    case 'mongodb':
      return userMongo;
  }
};

export const dataParent = () => {
  switch (global.dbChoice) {
    case 'mysql':
      return parentMysql;
    case 'mongodb':
      return parentMongo;
  }
};

// export const findOneUser = async (id: number | string) => {
//   return await data('User')?.findOneUser(id);
// };
