module.exports = (io, socket) => {
    const messageFromClient = (message) => {
        io.of("/valdovas").emit("messageToPersonalas", {
            socketID: socket.id,
            username: message.username,
            firstName: message.firstName,
            message: message.message
        });
    };

    const clientDisconnect = (data) => {
        io.of("/valdovas").emit("clientDisconnect", socket.id);
    }
    
    socket.on("messageFromClient", messageFromClient);
    socket.on("disconnect", clientDisconnect);
}