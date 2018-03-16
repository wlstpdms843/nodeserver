
const room_test = 'room1';

const chair = 8;

var roomList = [];

var roomPosition = [];

test(roomList);

function test(roomList) {


    roomList[room_test] = new Array();

    roomList[room_test][0] = new Array();
    roomList[room_test][0][0] = 'user1';
    roomList[room_test][0][1] = 'ready';

    roomList[room_test][1] = new Array();
    roomList[room_test][1][0] = 'user2';
    roomList[room_test][1][1] = 'ready';


    if(roomPosition[room_test] == null) {
        var playerNum = roomList[room_test].length;
        console.log(playerNum);
        var ArrayB = initPosition(playerNum, playerNum);
        console.log(ArrayB);

        roomPosition[room_test] = [];

        for(var i=0; i < chair; i++) {
            if(i < playerNum) {
                roomPosition[room_test][ArrayB[i]] = roomList[room_test][i][0];
            } else if(i < playerNum * 2) {
                roomPosition[room_test][ArrayB[i]] = 'NPC';
            } else {
                roomPosition[room_test][ArrayB[i]] = 'empty';
            }
        }

        
        console.log(roomPosition[room_test].toString());

    }
}


// npc 및 player 위치 랜덤생성
function initPosition(playerNum, npcNum) {


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

exports.initPosition = initPosition;