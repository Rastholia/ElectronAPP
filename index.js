import {server} from "socket.io";


const io = new server(3000);
const socket = io("ws://localhost:3000");


io.on("connection", (socket) => {
    // Envoi de message au client
    socket.emit("hello", "world");

    // Reçoit un message du client
    socket.on("howdy", (arg) => {
        console.log(arg) // Affiche "stranger"
    });
});

socket.on("hello", (arg) => {
    console.log(arg);
})

socket.emit("howdy","stranger");