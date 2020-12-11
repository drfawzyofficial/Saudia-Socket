/*@ here we include express-framework @*/
const express = require('express');
const app = express();
/*@ here we include express-framework @*/

/*@ here we include Socket.io @*/
const http = require("http").Server(app);
const io = require('socket.io')(http);
/*@ here we include Socket.io @*/


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

    socket.on('test', (data) => {
        socket.broadcast.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('test', data);
    })
    
    

   
 
 
    

    // socket.on('tableOnline', (data) => {
    //     try {
    //     console.log(data)
    //      console.log('Cashier has connected to Socket.io Real Time');
    //      io.emit('tableOnline', data);
    //     } catch(err) {
    //      console.log(err.message);
    //      socket.emit('error', { errMessage: err.message })
    //     }
    //  }); 
    socket.emit('ledo', 'there');

});
/*@ Socket.io Connection @*/

/*@ NodeJS App is listening to Port-8080 @*/
const port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log(`Running on Port: ${ port }`);
});
/*@ NodeJS App is listening to Port-8080 @*/
