# TinyTitleTinderServer

## Explore Rest APIs

The app defines following CRUD APIs.

<summary>The app defines following CRUD EndPoints.</summary>
<<<<<<< HEAD
| Method | Url                   | Description             |
=======

### User
| Method | Url                   | Description             | 
>>>>>>> a7ad1d91ab02536e1b2c8f2fb8779209ed2f63b9
|--------|-----------------------|-------------------------|
| POST   | /users                | Create a user           |
| GET    | /users/:id            | Get a user by ID        |
| GET    | /users                | Get all users           |
| PUT    | /users                | Edit a user by Id       |
<<<<<<< HEAD
| PUT    | /users/:id            | Delete a user by Id     |
=======
| DELETE | /users/:id            | Delete a user by Id     |

>>>>>>> a7ad1d91ab02536e1b2c8f2fb8779209ed2f63b9

### Parent
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /parents              | Create a parent         | 
| GET    | /parents/:id          | Get a parent by ID      | 
| GET    | /parents              | Get all parents         |  
| PUT    | /parents              | Edit a parent by Id     | 
| PUT    | /parents/:id          | Delete a parent by Id   | 

### Family
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /families             | Create a family         | 
| GET    | /families/:id         | Get a family by ID      | 
| GET    | /families             | Get all families        |  
| PUT    | /families             | Edit a family by Id     | 
| PUT    | /families/:id         | Delete a family by Id   | 

### Address
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /addresses            | Create a address        | 
| GET    | /addresses/:id        | Get a address by ID     | 
| GET    | /addresses            | Get all addresses       |  
| PUT    | /addresses            | Edit a address by Id    | 
| PUT    | /addresses/:id        | Delete a address by Id  |

### Role
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /roles                | Create a role           | 
| GET    | /roles/:id            | Get a role by ID        | 
| GET    | /roles                | Get all roles           |  
| PUT    | /roles                | Edit a role by Id       | 
| PUT    | /roles/:id            | Delete a role by Id     |

### Name
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /names                | Create a name           | 
| GET    | /names/:id            | Get a name by ID        | 
| GET    | /names                | Get all names           |  
| PUT    | /names                | Edit a name by Id       | 
| PUT    | /names/:id            | Delete a name by Id     |

### Location
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /locations            | Create a location       | 
| GET    | /locations/:id        | Get a location by ID    | 
| GET    | /locations            | Get all locations       |  
| PUT    | /locations            | Edit a location by Id   | 
| PUT    | /locations/:id        | Delete a location by Id |

### Origin
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /origins              | Create a origin         | 
| GET    | /origins/:id          | Get a origin by ID      | 
| GET    | /origins              | Get all origins         |  
| PUT    | /origins              | Edit a origin by Id     | 
| PUT    | /origins/:id          | Delete a origin by Id   |

### Meaning
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /meanings             | Create a meaning        | 
| GET    | /meanings/:id         | Get a meaning by ID     | 
| GET    | /meanings             | Get all meanings        |  
| PUT    | /meanings             | Edit a meaning by Id    | 
| PUT    | /meanings/:id         | Delete a meaning by Id  |

# Install guide
- To install the project run the follwing in the terminal: 
```
npm i
```

<details>
<summary>Env file setup guide before running</summary>
- Make an .env file in root with the following variables<br>
- PORT = The port the application is running on<br>
- DB_HOST = Name of the database host<br>
- DB_PORT = Database port<br>
- DB_USERNAME = Database username<br>
- DB_PASSWORD = Database password<br>
- DB_DATABASE = The name of the database<br>
</details>

<details>
<summary>All run commands</summary>

- Run as dev: 
```
npm run start-dev
```

- Run in production (only on production server): 
```
npm run start
```

# Eslint commands
- Run eslint to auto cleanup code: 
```
npm run format
```

- Run eslint to check code standard is valid: 
```
npm run lint
```

# Test command
- Run to run test with jest: 
```
npm run test
```

</details>

express setup with typescript: 
https://www.geeksforgeeks.org/how-to-use-express-in-typescript/

<details>
<summary>Documentation on lib</summary>
- Axios        =   https://www.npmjs.com/package/axios<br>
- Dotenv       =   https://www.npmjs.com/package/dotenv<br>
- Express      =   https://www.npmjs.com/package/express<br>
- Nodemon      =   https://www.npmjs.com/package/nodemon<br>
- Ts-node      =   https://www.npmjs.com/package/ts-node<br>
- Typescript   =   https://www.npmjs.com/package/typescript<br>
- Eslint       =   https://www.npmjs.com/package/eslint<br>
- Moment       =   https://momentjs.com/docs/<br>
- Bcrypt       =   https://github.com/kelektiv/node.bcrypt.js<br>
- Cors         =   https://www.npmjs.com/package/cors<br>
- JsonWebToken =   https://github.com/auth0/node-jsonwebtoken<br>
- Typeorm      =   https://typeorm.io/<br>
- Validator    =   https://www.npmjs.com/package/validator<br>
</details>


<details>
<summary>Coding standards in the project</summary>
- ....coming soon....
</details>
