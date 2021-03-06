# Project Outpost 🌿

Welcome to Project Outpost. This repository contains all the necessary information and all the code to get the app up and running. Below is some basic information on how to setup the local development environment and how to configure VS Code for this project. There is also some information on how this repository is structured.

## Setting up the local development environment

- Make sure to have [node.js](https://nodejs.org/en/) (Version 12) installed on your machine (check with `node --version`).

- Clone this repository using [GitHub Desktop](https://desktop.github.com) or `git clone`

- Open the cloned repository in a code editor of your choice ([Visual Studio Code](https://code.visualstudio.com/) is recommended)

- This project uses [postgres](https://www.postgresql.org) as it's main **database**. 

  - To easily handle the database stuff, install [Docker (Desktop)](https://docs.docker.com/docker-for-windows/release-notes/)

  - With Docker installed you can easily spin up the database needed for this app to run and [Adminer](https://www.adminer.org/de/) *(an admin UI to work on your database from the browser)*. 
    Open a terminal/cmd window within Visual Studio Code and run:

  ```
  docker-compose up -d
  ```

  - The database and admin UI are now running in containers on your machine. The admin UI can be reached via your browser at `localhost:9000`. The credentials to access the database from the admin UI are:

  ```
  System: PostgreSQL
  Server: db
  Username: postgres
  Password: my_pass
  ```

- The front- and backend are served by two different servers in development but get combined by [webpack](https://webpack.js.org/) when deployed. To setup front and backend:

  - Open another terminal/cmd window within VS Code and run:

  ```
  npm install
  ```

  *(This will install all necessary dependencies for this project)*

  - When all dependencies are successfully installed run:

  ```
  npx sequelize-cli db:migrate
  ```

  *(This will create the database schema) If the command does not work install the Sequelize CLI (`npm i -g sequelize-cli`)*

  - To generate some initial data (initial categories, origins and packaging options) run:

  ```
  npx sequelize-cli db:seed:all
  ```

  - When the database schema is set up successfully run:

  ```
  npm run dev
  ```

  - You should now be able to reach the app via your browser at `localhost:3000`

After finishing all steps above you should now be ready to start coding :)

## Configuring Visual Studio Code:

The following extensions are recommended:

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - to manage the database containers
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - for React Development
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - takes care of all the formatting


## Repository Structure

- Besides some configuration files in this repository consists of two main folders `client` and `server` (They are hidden in the `src` folder). Both are **node** apps.
  - The `client` folder contains all frontend related stuff ([React](https://reactjs.org/) and [Material UI](https://material-ui.com/)).
  - The `server` folder contains all backend code. Besides backend logic this includes the database connection and model (using [Sequelize](https://sequelize.org/v5/)) and the definition of all API Endpoints (using [express.js](https://expressjs.com/))

## Technology Stack

| Application Part | Techonologies        |
| ---------------- | -------------------- |
| Frontend         | React w/ Material UI |
| Backend          | node.js  w/ express  |
| Database         | PostgreSQL           |
