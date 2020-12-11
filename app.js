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
const User = require("./models/user");
const userNotification = require("./models/userNotification");
const residentNotification = require("./models/residentNotification");
/*@ Include all models in this place @*/

/*@ Socket.io Connection @*/
io.on('connection', (socket) => {
    socket.on('vue', async (we) => {
        socket.emit('vue', `there are lots of things now ${ we }`)
    });
    socket.on('adminJoin', (data) => {
       try {
        console.log('Admin has connected to Socket.io Real Time');
        socket.join(data.roomID);
       } catch(err) {
        console.log(err.message);
        socket.emit('error', { errMessage: err.message })
       }
    }); 
    socket.on('newUser', async data => {
        try {
            console.log('New User is Joining now');
            const user = await User.findById({ _id: data.userID });
            socket.broadcast.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('newUser', user);
            await userNotification({ userID: user._id }).save();
        } catch(err) {
            console.log(err.message);
            socket.emit('error', { errMessage: err.message })
        }
    })
    socket.on('resident', async data => {
        try {
            console.log('New Resident is comming now');
            const user = await User.findById({ _id: data.userID });
            socket.broadcast.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('resident', { user: user, residentID: data.residentID });
            await residentNotification({ userID: data.userID, residentID: data.residentID }).save()
        } catch(err) {
            console.log(err.message);
            socket.emit('error', { errMessage: err.message })
        }
    })
    socket.on('code', async data => {
        try {
            console.log('Code is sent');
            const user = await User.findById({ _id: data.userID });
            socket.broadcast.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('code', { codeStatus: data.codeStatus, user: user, residentID: data.residentID, code: data.code });
        } catch(err) {
            console.log(err.message);
            socket.emit('error', { errMessage: err.message });
        }
    });
    
    socket.on('acceptance', async data => {
        try {
            console.log('Acceptance is sent to User');
            const user = await User.findById({ _id: data.userID });
            io.to(user.socketID).emit('acceptance', { acceptance: data.acceptance, message: data.message });
        } catch(err) {
            console.log(err.message);
            socket.emit('error', { errMessage: err.message })
        }
    })
});
/*@ Socket.io Connection @*/

/*@ NodeJS App is listening to Port-8000 @*/
const port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log(`Running on Port: ${ port }`);
});
/*@ NodeJS App is listening to Port-8000 @*/
