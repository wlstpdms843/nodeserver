// socket.io 서버 생성
const io = require('socket.io').listen(5000);
// 방 관리의 주요 기능들을 모아놓은 것
const roomController = require('./roomController');
// 게임 시작 시 초기 셋팅
const initGameStart = require('./initGameStart');
// 게임 시작 시 초기 셋팅
const serverController = require('./serverController');



// 방 생성 관련 테스트
const room_test = 'room1';
// 한 게임에 진행 할 수 있는 최대 인원 (유저 + NPC)
const chair = 8;

// 접속해 있는 유저들 정보
// 키 값으로 유저 아이디가 들어가며, 밸류값으로 소켓 아이디 저장
// userList['유저ID'] = socket.id;
var userList = [];

// 방들 정보 저장
/*
	형식은 roomList['방이름'][유저번호(int)][유저속성(int)];
	1차원 (유사배열)	- 방이름 : 첫 방이름은 키값으로 스트링 형태의 데이터로 접근. 초기 방 생성시 배열에 생성
	2차원 배열		 - 유저 번호로써 유저가 해당 방에 입장한 순서대로 유저의 번호가 지정된다 예 ) 방장은 0번을 부여받음
	3차원 배열		 - 유저 속성으로는 현재 2가지가 존재함
			0) 배열 원소 0번에는 유저의 ID를 저장함
			1) 배열 원소 1번에는 유저의 현재 상태 (ready, notReady, start)를 저장
	
	유저 번호는 방에 접속한 순서대로 번호를 부여받으며 방에서 나갈 시 해당 방에서 유저의 정보는 사라진다.
*/
var roomList = [];

// 각 방에 유저 및 NPC 위치 정보(의자 번호)
var roomPosition = [];


// 2018_01_28 
// Server 시작을 알리는 부분
console.log('Server Started!');

// serverController.errtest();

// 2018_01_28 
// socket io 처리 부분
io.sockets.on('connection', function (socket) {

	console.log('connected : ' + socket.id);

	socket.join(room_test); // 정훈 테스트 용

	// 2012_02_08
	// 방 접속
	// roomController.joinRoom(socket);
	roomController.createRoom(socket, roomList);

	roomController.joinRoom(socket, roomList);

	roomController.userReadyChk(socket, roomList);

	roomController.userExit(socket, roomList);

	// 위치정보 수신 시 처리 이벤트
	getLocation(socket);

	// 2018_02_08
	// 맵에서의 각 플레이어들의 위치를 랜덤으로 생성하여 뿌려주는 역할
	initGameStart.sendInit(socket, roomList, roomPosition, chair);

	// 2018_02_08 
	// 한번에 모아서 보내줄 경우
	// 1. 모으는 이벤트
	socket.on('now2', function (jsonStr) {
		// ? += jsonStr;
	});

	/*
	// 모은 것들 보내는 이벤트
	socket.broadcast.to(room_test).emit('result', jsonStr);
	socket.setInterval(1000/30);
	*/

	// 2018_01_28 
	// 연결 끊어졌을때
	socket.on('disconnect', function (data) {
		console.log('disconn : ' + socket.id);

		socket.broadcast.emit('disconn', data);


	});
});


// 2018_02_05 
// unity 클라이언트로부터 해당하는 모션 정보를 받았을 경우
function getLocation(socket) {
	socket.on('now', function(jsonStr) {

		// 2018_02_05 
		// 같은 방에 존재하는 유저들에게 본인의 위치 정보를 전송함
		socket.broadcast.to(room_test).emit('result', jsonStr);
	});
};
