// 방 생성 관련 테스트
const room_test = 'room1';

// 유저가 서버에 접속 시 유저 ID에 socket.io를 저장시켜놓음.
function joinServer(socket, userList) {
	socket.on('joinServer', function() {
		userList[userId] = socket.id;
	});
}

// 유저의 정상적인 서버 종료 시 ? // 아직 구현 미완료
function exitServer(socket, userList) {
	socket.on("exitServer",function(userId) {
		delete userList[userId];
	});
}

// 유저의 정상적인 종료 및, 예기치 못한 종료 시 처리
function disconnected(socket, userList, roomList) {
	socket.on('disconnect', function() {
		for(var key in userList){
			if(userList[key] == socket.id){
                
                //유저 닉네임
                var nick = key;

                var userCnt = roomList[room_test].length;

                //접속 종료된 유저 찾는 for문
                for (var i = 0; i < userCnt; i++) {
                    if(roomList[room_test][i][0] == nick){
                        //방 배열에서 종료된 유저 삭제
                        roomList[room_test].splice(i,1);
                    }
                }
                //유저 배열에서 유저 삭제
				delete userList[key];
                
                //클라이언트에 종료한 유저 닉네임 전송
                socket.broadcast.to(room_test).emit('exitUser', nick);

                break;
			}
		}
    });
}


exports.joinServer = joinServer;
exports.exitServer = exitServer;
exports.disconnected = disconnected;