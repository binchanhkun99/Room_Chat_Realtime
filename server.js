const path = require('path')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const formatMessage =require('./untils/message');// lấy format Mess đã tạo ở bên file message.js
const { 
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUser
} = require('./untils/users');
//Khởi tại các đối tượng
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Thông báo';//tạo 1 con bot để tạo câu chat chào mừng nếu 1 người vào phòng hc noti khi rời phòng

io.on('connection', socket => {
    
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', formatMessage(botName, `Chào mừng ${user.username} đến với Boxchat`));
        socket.broadcast.to(user.room)
        .emit('message',formatMessage(botName, `${user.username} đã tham gia cuộc trò chuyện`));
        //Lấy thông tin phòng và người dùng trc khi vào phòng
        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getRoomUser(user.room)
        });
       
    });
    
    // lang nghe cuoc tro chuyen
    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    });
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user)
        {
            io.to(user.room)
            .emit('message',
            formatMessage(botName,`${user.username} đã rời khỏi cuộc trò chuyện`));
            //Lấy thông tin phòng và người dùng khớp trc khi out
        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getRoomUser(user.room)
        });
        }
        
    });
});

const PORT = process.env.PORT || 3000;
//server đang chạy ở ${PORT}
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));