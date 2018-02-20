
const room_test = 'room1';

// 게임 시작 시 유저와 NPC의 자리를 랜덤 생성 후 전달
function sendInit(socket, roomList, roomPosition, chair) {
	//socket.on('sendInit', function(roomName) {
	socket.on('reqPosition', function() {
		console.log('reqPosition : socket get event');

		test_User(roomList);

//		if(roomPosition[room_test] == null) {
		if(true) {
			var playerNum = roomList[room_test].length;
			var arr = initPosition(playerNum, playerNum, chair);

			roomPosition[room_test] = new Array();

			for(var i=0; i < chair; i++) {
				if(i < playerNum) {
					roomPosition[room_test][arr[i]] = roomList[room_test][i][0];
				} else if(i < playerNum * 2) {
					roomPosition[room_test][arr[i]] = 'NPC';
				} else {
					roomPosition[room_test][arr[i]] = 'empty';
				}
			}

			console.log('reqPosition : socket send event = resPosition');

			socket.broadcast.to(room_test).emit('resPosition', roomPosition[room_test]);
			socket.emit('resPosition', roomPosition[room_test]);
			// io.to(room_test).emit('resPosition', roomPosition[room_test]); // 되는 코드이지만 메인에서 io를 끌어와야함
			// socket.to(room_test).emit('resPosition', roomPosition[room_test]);	// 안됨
			// socket.in(room_test).emit('resPosition', roomPosition[room_test]);	// 안됨
		}
	});
}


// npc 및 player 위치 랜덤생성
function initPosition(playerNum, npcNum, chair) {

	var position = new Array(chair);

	for (var i = 0; i < chair; i++) {
		position[i] = i;
	}

	var temp = 0;
	for (var i = 0; i < playerNum + npcNum; i++) {
		var num = Math.floor((Math.random() * chair - i) + i);

		temp = position[i];
		position[i] = position[num];
		position[num] = temp;
	}

	return position;
};


function test_User(roomList) {
	roomList[room_test] = new Array();

	roomList[room_test][0] = new Array();

	roomList[room_test][0][0] = 'oneUser';
	roomList[room_test][0][1] = 'notReady';

	roomList[room_test][1] = new Array();

	roomList[room_test][1][0] = 'hiyo';
	roomList[room_test][1][1] = 'notReady';
}

exports.sendInit = sendInit;