# 🏬 SuperSell External Services Server

Microservice server to handle Supersell Server external services such as payment and e-mail using Event Driven Architecture.

- [Table of Content](#table-of-content)
- [How To Run](#how-to-run)
- [Tests](#tests)

### Requirements

Before you start, you should have installed in your machine the following tools:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [Docker](https://www.docker.com/). Preferably Node.js version >= v18.
To edit the code you can use a code editor like [VSCode](https://code.visualstudio.com/).

### 🔥 Running SuperSell Server

- Clone this repository

```bash
git clone git@github.com:augustojs1/supersell_external_services.git
```

- Cd into the project directory

```bash
cd supersell_external_services
```

- Create a new .env file

```bash
touch .env
```

- Fill in the keys in .env with values

```bash
# Database
# Dev
DATABASE_URL=
```

- Create new development.env environment variable file inside the configuration folder

```bash
touch infra/config/env/development.env
```

- Fill in the keys in development.env with values

```bash
# Port
PORT=

# Database
DATABASE_URL=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=
```

- Install the project dependencies

```bash
npm install
```

- Start the Docker container

```bash
docker-compose up -d
```

- Push the tables to database

- Run the project

```bash
npm run start:dev
```

- Project runs locally on: http://localhost:PORT

### 👨‍🔬 Tests

- Run the application tests

```bash
npm run test
```
