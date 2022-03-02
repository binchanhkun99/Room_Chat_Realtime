const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const romeName = document.getElementById('room-name');
const userList = document.getElementById('users');  

//Lấy tên người dùng và phòng từ chuối URL
const { username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true 
});

const socket = io();

// Tham gia phong chat
socket.emit('joinRoom', {username, room});

//Get phòng và người dùng
socket.on('roomUser', ({ room, users }) =>{
    outputRoomName(room);
    outputUsers(users);
});


socket.on('message', message =>{
    console.log(message)
    outputMessage(message);
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

//Nhận nội dung tin nhắn
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    //Tin nhắn đc gửi đến máy chủ
    socket.emit('chatMessage', msg);
    //sau khi nhấn nút gửi thì xoá hết nội dung trong ô input và focus con trỏ trở lại ô input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); 
});

//Hiển thị nội dung tin nhắn mà người dùng đã gửi lên màn hình 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span class="text1">${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
//hiển thị tên phòng và tên người tham gia chat
function outputRoomName(room){
    romeName.innerText = room;

}


//Hiển thị tên người dùng đã tham gia vào phòng
function outputUsers(users){
    userList.innerHTML = `
    ${users.map( user =>`<li>${user.username}</li>`).join('')}`;
}

//Nút rời phòng
document.getElementById('')
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Bạn chắc chắn muốn rời phòng chat?');
    if(leaveRoom){
        window.location = '../index.html';
    }
    else{
        
    }
})