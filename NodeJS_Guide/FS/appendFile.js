var fs = require("fs");

var data = new Buffer("这是追加的内容.\r\n");

//==============异步执行=================================
// fs.appendFile('./res/kkk.txt', data, 'utf8', function(err) {
// 	if(err) console.log(err);
// 	else console.log("追加成功.");
// });

//==============同步执行=======================

try{
	fs.appendFileSync('./res/kkk.txt', data, 'utf8');
	console.log("追加成功.");
}catch(ex){
	console.log(ex);
}