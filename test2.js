var dataArray = new Array('asd', 'bbb', 'ccc');

var jsonEncode = JSON.stringify(dataArray);

console.log(jsonEncode.toString());



var jsonDecode = JSON.parse(jsonEncode);

console.log(jsonDecode[0]);

