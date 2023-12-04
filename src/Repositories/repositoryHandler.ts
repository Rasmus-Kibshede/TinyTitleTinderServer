const data = (entity: string) => {
  switch (global.dbChoice) {
    case 'mysql':
      return mysql;
    case 'mongodb':
      return mongo;
  }
};
