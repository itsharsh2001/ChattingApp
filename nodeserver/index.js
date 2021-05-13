//node server which will handle socket io connections
const io = require('socket.io')(8000)
const mongoose = require('mongoose')
const {findPerson} = require('../js/people.js')
// var CryptoJS = require("crypto-js");


const users = {};

io.on("connection", socket => {
    socket.on('new-user-joined', async({name, userID}) => {
        console.log("New User", name)
        console.log("New User", userID)

        if(mongoose.Types.ObjectId.isValid(userID)){
            const person = await findPerson(name, userID)
            console.log(person)
            if(person){
                // console.log(person)
                users[socket.id] = name;
                socket.broadcast.emit('user-joined', name);
            }
        
        }
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
        // socket.broadcast.emit('receive',{message: CryptoJS.AES.encrypt(message, 'secret key 123').toString(),name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})