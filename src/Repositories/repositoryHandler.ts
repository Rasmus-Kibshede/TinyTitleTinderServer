import { userRepo as mysql } from './mysql/userRepository';
import { userRepoMDB as mongo } from './mongo/userRepository';
// import { parentRepo } from './mysql/parentRepository';
// import { parentRepo as mongoParent } from './mysql/parentRepository';

export const data = (entity: string) => {
  const dbChoice = global.dbChoice;
  const repos = [
    { name: `${dbChoice}User`, repo: mysql },
    { name: `${dbChoice}User`, repo: mongo },
  ];
  switch (dbChoice) {
    case 'mysql':
      return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
    case 'mongodb':
      return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
    default:
      return repos.find((repo) => repo.name === dbChoice + entity)?.repo;
  }
};

export const findOneUser = async (id: number | string) => {
  return await data('User')?.findOneUser(id);
};
