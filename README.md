# TinyTitleTinderServer

## Explore Rest APIs

The app defines following CRUD APIs.

### User
<details>
<summary>The app defines following CRUD EndPoints.</summary>
| Method | Url                   | Description                    | Sample Valid Request Body                               |
|--------|-----------------------|-------------------------|----------------------------------------------------------------|
| POST   | /users                | Create a user           | {"email": "Post@man.com", "password": "CreatedWithPostman1234"}|
| GET    | /users/:id            | Get a user by ID        |                                                                |
| GET    | /users                | Get all users           |                                                                |
| PUT    | /users/:id            | Edit a user by Id       | {"email": "new@email.com} or {"password":"newpassword1234}     |
| DELETE | /users/:id            | Delete a user by Id     |                                                                |
</details>

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
</details>


<details>
<summary>Coding standards in the project</summary>
- ....coming soon....
</details>