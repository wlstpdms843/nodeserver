/*
    해당 파일은 테스트를 위한 함수들로 구성되어 있음.
*/


// 임의로 방 안에 유저의 정보를 삽임
function test_User(roomList) {
	roomList[room_test] = new Array();

	roomList[room_test][0] = new Array();

	roomList[room_test][0][0] = 'oneUser';
	roomList[room_test][0][1] = 'notReady';

	roomList[room_test][1] = new Array();

	roomList[room_test][1][0] = 'hiyo';
	roomList[room_test][1][1] = 'notReady';
}



function errtest() {
    var arrayTest = [];
    arrayTest['test'] = new Array();

    //Array.prototype.push.apply(arrayTest['test']);

    // console.log('arrayTestFirst = ' + arrayTest['test'].push(0));
    // console.log('arrayTest = ' + arrayTest['test'].length);
    // console.log(arrayTest['test'][]);
    
    arrayTest['test'][0] = new Array();
    arrayTest['test'][1] = new Array();
    arrayTest['test'][2] = new Array();

    arrayTest['test'][0][0] = 1;
    arrayTest['test'][0][1] = 'aaaaa';
    arrayTest['test'][0][2] = 1;
    arrayTest['test'][0][3] = 1;
    arrayTest['test'][2][0] = 1;
    arrayTest['test'][2][1] = 1;

    // console.log('arrayTest = ' + arrayTest['test'].length);

/*
    arrayTest['test'][0] = 1;
    console.log('arrayTest = ' + arrayTest['test'].length());
    arrayTest['test'][1] = 1;
    console.log('arrayTest = ' + arrayTest['test'].length());
    arrayTest['test'][2] = 1;
    console.log('arrayTest = ' + arrayTest['test'].length());
*/
}


exports.test_User = test_User;
exports.errtest = errtest;