# Project Outpost 🌿
Welcome to Project Outpost. This repository contains all the necessary information and all the code to get the app up and running. When looking at the [Project](https://github.com/moritz158/project-outpost/projects/1) section of this repo all todos can be found. Below is some basic information on how to setup the local development environment and how to configure VS Code for this project. There is also some information on how this repository is structured. Some more information can be found in the [wiki-section](https://github.com/moritz158/project-outpost/wiki) of this project.

## Setting up the local development environment
- Make sure to have [node.js](https://nodejs.org/en/) installed on your machine (check with `node --version`).

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

- The front- and backend are served by to different servers in development but get combined by [webpack](https://webpack.js.org/) when deployed. To setup front and backend:
  
  - Open another terminal/cmd window within VS Code and run:
  ```
  npm install
  ```
  *(This will install all necessary dependencies for this project)*

  - When all dependencies are successfully installed run:
  ```
  npm run dev
  ``` 
  - You should now be able to reach the app via your browser at `localhost:3000`

After finishing all the steps above you should now be ready to start coding :)

## Configuring Visual Studio Code:
The following extensions are recommended:
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - to manage the database containers
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - for React Development
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - to ensure code-quality this project uses ESLint. [Airbnb's](https://github.com/airbnb/javascript) Style Guide is used.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - takes care of all the formatting

Use the following settings with the extensions above installed:
```json
{
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```


## Repository Structure
- Besides some configuration files in this repository consists of two main folders `client` and `server` (They are hidden in the `src` folder). Both are **node** apps.
    - The `client` folder contains all frontend related stuff ([React](https://reactjs.org/) and [Material UI](https://material-ui.com/)).
    - The `server` folder contains all backend code. Besides backend logic this includes the database connection and model (using [Sequelize](https://sequelize.org/v5/)) and the definition of all API Endpoints (using [express.js](https://expressjs.com/))

## Technology Stack
| Application Part | Techonologies       |
| ---------------- | --------------------|
| Frontend         | React w/ Material UI|
| Backend          | node.js  w/ express | 
| Database         | PostgreSQL          |  
