
// 2018_02_05 
// unity 클라이언트로부터 해당하는 모션 정보를 받았을 경우
//function getMovement(socket) {
function getMovement(socket) {
	socket.on('now', function(jsonStr) {

		// 2018_02_05 
		// 같은 방에 존재하는 유저들에게 본인의 위치 정보를 전송함
		socket.broadcast.to(room_test).emit('result', jsonStr);
	});
};

// 2018_02_22
// 플레이어가 총을 집었다는 정보를 수신 했을 경우
function getPickUpGun(socket) {
	socket.on('pickUpGun', function(jsonStr) {
	});
};

// 2018_02_22
// 플레이어가 다시 총을 드랍 했을 경우
function getDropGun(socket) {
	socket.on('dropGun', function(jsonStr) {
	});
};

// 2018_02_22
// 플레이어가 총을 쐈을 때
function getShootGun(socket) {
	socket.on('shootGun', function(jsonStr) {
	});
};

// 2018_02_22
// 플레이어가 죽었을 때
function getPlayerDie(socket) {

}


// 2018_02_08 // 현재 구현 미완성 추후 문제 발생시 사용 
// 한번에 모아서 보내줄 경우
// 1. 모으는 이벤트
function getMovementAllSave(socket) {
	socket.on('now2', function (jsonStr) {
		// ? += jsonStr;
	});
}
/*
// 모은 것들 보내는 이벤트
socket.broadcast.to(room_test).emit('result', jsonStr);
socket.setInterval(1000/30);
*/


exports.getMovement = getMovement;
exports.getPickUpGun = getPickUpGun;
exports.getDropGun = getDropGun;
exports.getShootGun = getShootGun;
exports.getPlayerDie = getPlayerDie;
