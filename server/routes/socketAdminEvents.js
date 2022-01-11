module.exports = (io, socket) => {
   
    const messageFromPersonalas = (message) => {
        io.of('/').to(message.socketID).emit("messageToClient", message.message); //.to(message.socketID)
    }

    socket.on("messageFromPersonalas", messageFromPersonalas);
}