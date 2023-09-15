import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({username, socketId});
};

const deleteUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUser = (username) => {
    return onlineUsers.find(user => user.username === username);
};

io.on("connection", (socket) => {

    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
    });

    socket.on("sendNotification", ({senderName, receiverName, type}) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
            senderName, type
        });
    });

    socket.on("sendMessage", ({senderName, receiverName, message}) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getMessage", {
            senderName, message
        });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User disconnect!");
        deleteUser(socket.id);
    });

});

io.listen(6974);