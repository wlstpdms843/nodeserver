
const room_test = 'room1';

// 2018_02_15
// 게임 시작 시 유저와 NPC의 자리를 랜덤 생성 후 전달
function sendInit(socket, roomList, roomStatus, chair) {
	//socket.on('sendInit', function(roomName) {
	socket.on('reqPosition', function() {
		// console.log('reqPosition : socket get event');

		//test_User(roomList);

		if(roomStatus[room_test]['characterPosition'] == null) {
			console.log('sendInit : if = ' + '방생성');
			var playerNum = roomList[room_test].length;
			var arr = initPosition(playerNum, playerNum, chair);

			roomStatus[room_test]['characterPosition'] = new Array();

			for(var i=0; i < chair; i++) {
				if(i < playerNum) {
					roomStatus[room_test]['characterPosition'][arr[i]] = roomList[room_test][i][0];
				} else if(i < playerNum * 2) {
					roomStatus[room_test]['characterPosition'][arr[i]] = 'NPC';
				} else {
					roomStatus[room_test]['characterPosition'][arr[i]] = 'empty';
				}
			}

			// console.log('reqPosition : socket send event = resPosition');

			socket.emit('resPosition', roomStatus[room_test]['characterPosition']);

		} else {
			console.log('sendInit : else = ' + '방생성 되있음, 포지션 정보만 전송');
			socket.emit('resPosition', roomStatus[room_test]['characterPosition']);
		}
	});
}


// 2018_02_15
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



exports.sendInit = sendInit;