# real-time-inventory-manager

This is a FullStack Inventory Management Application built with Node.js, React.js and MongoDB. One of the main feature of this application is that it notify the action of add, update and deletion of inventory on the frontend in real time. This functionality has been achieved by socke.io

## Main technologies and framework used

-   Node.js
-   Express
-   MongoDB
-   React.js

## Requirements

To run this app in your machine, Node.js and MongoDB should be installed in your system.

## Installation

Follow the steps below to run the app in your system

1. Open terminal and run command
   `git clone https://github.com/afzalimam09/real-time-inventory-manager.git` to clone the project or download it from the download button.

2. Open the project folder in VS code or any other code editor.
3. First of all move into server folder and run command `npm i` to download all the dependencies
4. Create a `.env` file in the root directory and add all the values present in `.env.example` file.
5. The value of `NODE_ENV` in `.env` file can be either `development` or `production`
6. Run command `npm start` or `npm run dev` to run the code.
7. To know about the endpoints of this API please follow below api documentation url.

8. Move into the frontend folder and run command `npm i` to download all the dependencies
9. Create a `.env` file in the root directory and add the value of VITE_BACKEND_URL=http://localhost:5000
10. Run command `npm start` or `npm run dev` to launch the frontend.

## API Documentation

Check documentation of this API on below link

https://documenter.getpostman.com/view/23125063/2s93XsYRjM

## Deployed Links
Check the live website: https://realinventory.netlify.app/
Deployed API URL and EndPoints : https://real-inventory.onrender.com/api/v1/inventory
