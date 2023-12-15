# TinyTitleTinderServer

## Explore Rest APIs

The app defines following CRUD APIs.

<summary>The app defines following CRUD EndPoints.</summary>

### User
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /users                | Create a user           |
| GET    | /users/:id            | Get a user by ID        |
| GET    | /users                | Get all users           |
| PUT    | /users                | Edit a user by Id       |
| PUT    | /users/:id            | Delete a user by Id     |

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

### Definition
| Method | Url                   | Description             | 
|--------|-----------------------|-------------------------|
| POST   | /definitions             | Create a definition        | 
| GET    | /definitions/:id         | Get a definition by ID     | 
| GET    | /definitions             | Get all definitions        |  
| PUT    | /definitions             | Edit a definition by Id    | 
| PUT    | /definitions/:id         | Delete a definition by Id  |

# Install guide
- To install the project run the follwing in the terminal: 
```
npm i
```

<details>
<summary>Env file setup guide before running</summary>
- Make an .env file in root with the following variables<br>
Copy and paste the env file below:
  
#Mysql DB
# DB_MYSQL_HOST=
# DB_MYSQL_PORT=3306
# DB_MYSQL_USERNAME=
# DB_MYSQL_PASSWORD=
# DB_MYSQL_DATABASE=

# Mongo DB
DB_MONGO_DATABASE=
DB_MONGO_URL=

# Server port
PORT=3000

# JWT
JWT_SECRET=

SYNCHRONIZE=false

- Information about the content in this env file.
Mysql db = the mysql connection informations needed.
Mongo db = the mongo connection informations needed.
  - url example for localhost: mongodb://localhost:27017/?authMechanism=DEFAULT
  - url example for production: mongodb+srv://<username>:<password>@<database>.mongodb.net/
JWT = a secret that can be anything, need this for generation of JWT.
SYNCHRONIZE = true or false. Default value is false if the value is not set.
  - SYNCHRONIZE is creating the data structure in the database from typeorm base entities.

</details>

<details>
<summary>All run commands</summary>

- Run as dev: 
```
npm run dev
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
<summary>Documentation on libs</summary>
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
