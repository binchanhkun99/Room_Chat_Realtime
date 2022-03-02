const users = [];

//Người dùng tham gia vào phòng chat
function userJoin(id, username, room){
    const user = { id, username, room }
    users.push(user);
    return user;

}
//Lấy người dùng hiện tại
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

//Người dùng rời khỏi phòng chát
function userLeave(id){
    const index = users.findIndex(user => user.id===id);
    if(index != -1){
        return users.splice(index, 1)[0];  
    }
}
// Lấy phòng của người dùng
function getRoomUser(room){ 
    return users.filter(user => room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUser
}