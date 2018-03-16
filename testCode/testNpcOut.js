
var room_test = 'room1';

const totalGameTime = 180; // 게임 총 시간
const sideTime = 15; // 게임 양 끝의 대기 시간? (게임 시작 대기, 게임 종료 전 진행을 위한 시간)

var roomStatus = new Array();
roomStatus[room_test] = new Array();
roomStatus[room_test]['characterPosition'] = new Array();
roomStatus[room_test]['characterPosition'][0] = 'NPC';
roomStatus[room_test]['characterPosition'][1] = 'NPC';
roomStatus[room_test]['characterPosition'][2] = 'user1';
roomStatus[room_test]['characterPosition'][3] = 'NPC';
roomStatus[room_test]['characterPosition'][4] = 'NPC';
roomStatus[room_test]['characterPosition'][5] = 'user2';
roomStatus[room_test]['characterPosition'][6] = 'NPC';
roomStatus[room_test]['characterPosition'][7] = 'NPC';

NpcOutTest();


function NpcOutTest() {

    
    var npcCnt = 6;

    var eventNpcOut = randomTimeNpcOut(npcCnt);
    
    var j=0;

    var npcPosition = randomPositionNpc(roomStatus[room_test]['characterPosition']);


    while(npcPosition.length > 0) {
        console.log(npcPosition[0]);
        npcPosition.splice(0,1);
    }
    
}


//npc가 퇴장하는 랜덤 시간 배열 return
function randomTimeNpcOut(npcCnt) {
    var averOutTime = (totalGameTime - sideTime * 2) / npcCnt;

    var outTimeArray = new Array();
    for(var i=0; i<npcCnt; i++) {
       var randomNum = Math.floor(Math.random() * 6); // 0~5의 값을 뽑아내기 위함 맞는지 체크 필요
       outTimeArray[i] = averOutTime - randomNum;
    }
    outTimeArray[npcCnt] = averOutTime;

   return outTimeArray;
};

function randomPositionNpc(npcPosition) {

    var temp = 0;
    var arrayCnt = 0;
    var random = new Array();
    
    for(var i=0; i<npcPosition.length; i++) {
        if(npcPosition[i] == 'NPC') {
            random[arrayCnt] = i;
            arrayCnt++;
        }
    }

	for (var i = 0; i < random.length; i++) {
        var num = Math.floor((Math.random() * random.length - i) + i);

		temp = random[i];
		random[i] = random[num];
        random[num] = temp;
    }

    return random;
}