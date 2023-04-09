import { Server } from "socket.io";
let io;

// Define a function for initializing the Socket.IO server
export const initSocket = (server) => {
    io = new Server(server);
    //// Set up a listener for the "connection" event, triggered when a new client connects
    io.on("connection", (socket) => {
        console.log(`Client with socket id ${socket.id} connected`);
        // Set up a listener for the "disconnect" event on each connected socket, triggered when a client disconnects
        socket.on("disconnect", (socket) => {
            console.log(`Cliend with socket id ${socket.id} disconnected`);
        });
    });
};

// function for emitting an "add_inventory" event to all connected clients
export const emitAddInventory = (data) => {
    io.emit("add_inventory", data);
};

//function for emitting an "update_inventory" event to all connected clients
export const emitUpdateInventory = (data) => {
    io.emit("update_inventory", data);
};

//function for emitting a "delete_inventory" event to all connected clients
export const emitDeleteInventory = (data) => {
    io.emit("delete_inventory", data);
};
