import { userRepo as mysql } from './mysql/userRepository';
import { userRepoMDB as mongo } from './mongo/userRepository';
import { parentRepo } from './mysql/parentRepository';
import { parentRepo as mongoParent } from './mysql/parentRepository';

export const data = (entity: string) => {
const repos = [{name: 'mysqlUser', repo: mysql}, {name: 'mongoUser', repo:  mongo}, {name: 'mysqlParent', repo: parentRepo}, {name: 'mongoParent', repo: mongoParent}];
  switch (global.dbChoice) {
    case 'mysql':
      return repos.find((repo)=> repo.name === entity)?.repo;
    case 'mongodb':
      return repos.find((repo)=> repo.name === entity)?.repo;
  }
};
