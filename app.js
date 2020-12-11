/*@ here we include express-framework @*/
const express = require('express');
const app = express();
/*@ here we include express-framework @*/

/*@ here we include Socket.io @*/
const http = require("http").Server(app);
const io = require('socket.io')(http);
/*@ here we include Socket.io @*/

/*@ here we connect to DBs with mongoDB @*/
require('./Connection/mongoose');
/*@ here we connect to DBs with mongoDB @*/

/*@ Include all models in this place @*/
const Table = require("./models/Table");
/*@ Include all models in this place @*/

// (unique room for cashier)

/*@ Socket.io Connection @*/
io.on('connection', (socket) => {
    socket.on('cashierJoin', (data) => {
       try {
        console.log('Cashier has connected to Socket.io Real Time');
        socket.join(data.roomID);
       } catch(err) {
        console.log(err.message);
        socket.emit('error', { errMessage: err.message })
       }
    }); 
});
/*@ Socket.io Connection @*/

/*@ NodeJS App is listening to Port-8080 @*/
const port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log(`Running on Port: ${ port }`);
});
/*@ NodeJS App is listening to Port-8000 @*/
