const socket = io('http://localhost:8000');
// import { AES, enc } from "crypto-js";
{/* <script type="text/javascript" src="path-to/bower_components/crypto-js/crypto-js.js"></script> */}

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ding-sound-effect_2.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
})


const name = prompt("Enter your name to join");
const userID = prompt("Enter your userID to join");


socket.emit('new-user-joined', {name, userID});

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
    // append(`${data.name}: ${AES.decrypt(data.message, 'secret key 123').toString(enc.Utf8)}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'right');
})

